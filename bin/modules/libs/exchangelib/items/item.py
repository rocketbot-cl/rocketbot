import logging

from ..fields import BooleanField, IntegerField, TextField, CharListField, ChoiceField, URIField, BodyField, \
    DateTimeField, MessageHeaderField, AttachmentField, Choice, EWSElementField, EffectiveRightsField, CultureField, \
    CharField, MimeContentField, FieldPath
from ..properties import ConversationId, ParentFolderId, ReferenceItemId, OccurrenceItemId, RecurringMasterItemId,\
    ResponseObjects, Fields
from ..services import GetItem, CreateItem, UpdateItem, DeleteItem, MoveItem, CopyItem, ArchiveItem
from ..util import is_iterable, require_account, require_id
from ..version import EXCHANGE_2010, EXCHANGE_2013
from .base import BaseItem, BulkCreateResult, SAVE_ONLY, SEND_ONLY, SEND_AND_SAVE_COPY, ID_ONLY, SEND_TO_NONE, \
    AUTO_RESOLVE, SOFT_DELETE, HARD_DELETE, ALL_OCCURRENCIES, MOVE_TO_DELETED_ITEMS

log = logging.getLogger(__name__)


class Item(BaseItem):
    """MSDN: https://docs.microsoft.com/en-us/exchange/client-developer/web-service-reference/item"""
    ELEMENT_NAME = 'Item'

    LOCAL_FIELDS = Fields(
        MimeContentField('mime_content', field_uri='item:MimeContent', is_read_only_after_send=True),
        EWSElementField('parent_folder_id', field_uri='item:ParentFolderId', value_cls=ParentFolderId,
                        is_read_only=True),
        CharField('item_class', field_uri='item:ItemClass', is_read_only=True),
        CharField('subject', field_uri='item:Subject'),
        ChoiceField('sensitivity', field_uri='item:Sensitivity', choices={
            Choice('Normal'), Choice('Personal'), Choice('Private'), Choice('Confidential')
        }, is_required=True, default='Normal'),
        TextField('text_body', field_uri='item:TextBody', is_read_only=True, supported_from=EXCHANGE_2013),
        BodyField('body', field_uri='item:Body'),  # Accepts and returns Body or HTMLBody instances
        AttachmentField('attachments', field_uri='item:Attachments'),  # ItemAttachment or FileAttachment
        DateTimeField('datetime_received', field_uri='item:DateTimeReceived', is_read_only=True),
        IntegerField('size', field_uri='item:Size', is_read_only=True),  # Item size in bytes
        CharListField('categories', field_uri='item:Categories'),
        ChoiceField('importance', field_uri='item:Importance', choices={
            Choice('Low'), Choice('Normal'), Choice('High')
        }, is_required=True, default='Normal'),
        TextField('in_reply_to', field_uri='item:InReplyTo'),
        BooleanField('is_submitted', field_uri='item:IsSubmitted', is_read_only=True),
        BooleanField('is_draft', field_uri='item:IsDraft', is_read_only=True),
        BooleanField('is_from_me', field_uri='item:IsFromMe', is_read_only=True),
        BooleanField('is_resend', field_uri='item:IsResend', is_read_only=True),
        BooleanField('is_unmodified', field_uri='item:IsUnmodified', is_read_only=True),
        MessageHeaderField('headers', field_uri='item:InternetMessageHeaders', is_read_only=True),
        DateTimeField('datetime_sent', field_uri='item:DateTimeSent', is_read_only=True),
        DateTimeField('datetime_created', field_uri='item:DateTimeCreated', is_read_only=True),
        EWSElementField('response_objects', field_uri='item:ResponseObjects', value_cls=ResponseObjects,
                        is_read_only=True,),
        # Placeholder for ResponseObjects
        DateTimeField('reminder_due_by', field_uri='item:ReminderDueBy', is_required_after_save=True,
                      is_searchable=False),
        BooleanField('reminder_is_set', field_uri='item:ReminderIsSet', is_required=True, default=False),
        IntegerField('reminder_minutes_before_start', field_uri='item:ReminderMinutesBeforeStart',
                     is_required_after_save=True, min=0, default=0),
        TextField('display_cc', field_uri='item:DisplayCc', is_read_only=True),
        TextField('display_to', field_uri='item:DisplayTo', is_read_only=True),
        BooleanField('has_attachments', field_uri='item:HasAttachments', is_read_only=True),
        # ExtendedProperty fields go here
        CultureField('culture', field_uri='item:Culture', is_required_after_save=True, is_searchable=False),
        EffectiveRightsField('effective_rights', field_uri='item:EffectiveRights', is_read_only=True),
        CharField('last_modified_name', field_uri='item:LastModifiedName', is_read_only=True),
        DateTimeField('last_modified_time', field_uri='item:LastModifiedTime', is_read_only=True),
        BooleanField('is_associated', field_uri='item:IsAssociated', is_read_only=True, supported_from=EXCHANGE_2010),
        URIField('web_client_read_form_query_string', field_uri='item:WebClientReadFormQueryString',
                 is_read_only=True, supported_from=EXCHANGE_2010),
        URIField('web_client_edit_form_query_string', field_uri='item:WebClientEditFormQueryString',
                 is_read_only=True, supported_from=EXCHANGE_2010),
        EWSElementField('conversation_id', field_uri='item:ConversationId', value_cls=ConversationId,
                        is_read_only=True, supported_from=EXCHANGE_2010),
        BodyField('unique_body', field_uri='item:UniqueBody', is_read_only=True, supported_from=EXCHANGE_2010),
    )
    FIELDS = LOCAL_FIELDS[0:1] + BaseItem.FIELDS + LOCAL_FIELDS[1:]

    __slots__ = tuple(f.name for f in LOCAL_FIELDS)

    # Used to register extended properties
    INSERT_AFTER_FIELD = 'has_attachments'

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # pylint: disable=access-member-before-definition
        if self.attachments:
            for a in self.attachments:
                if a.parent_item:
                    if a.parent_item is not self:
                        raise ValueError("'parent_item' of attachment %s must point to this item" % a)
                else:
                    a.parent_item = self
                self.attach(self.attachments)
        else:
            self.attachments = []

    def save(self, update_fields=None, conflict_resolution=AUTO_RESOLVE, send_meeting_invitations=SEND_TO_NONE):
        from .task import Task
        if self.id:
            item_id, changekey = self._update(
                update_fieldnames=update_fields,
                message_disposition=SAVE_ONLY,
                conflict_resolution=conflict_resolution,
                send_meeting_invitations=send_meeting_invitations
            )
            if self.id != item_id \
                    and not isinstance(self._id, (OccurrenceItemId, RecurringMasterItemId)) \
                    and not isinstance(self, Task):
                # When we update an item with an OccurrenceItemId as ID, EWS returns the ID of the occurrence, so
                # the ID of this item changes.
                #
                # When we update certain fields on a task, the ID may change. A full description is available at
                # https://docs.microsoft.com/en-us/exchange/client-developer/web-service-reference/updateitem-operation-task
                raise ValueError("'id' mismatch in returned update response")
            # Don't check that changekeys are different. No-op saves will sometimes leave the changekey intact
            self._id = self.ID_ELEMENT_CLS(item_id, changekey)
        else:
            if update_fields:
                raise ValueError("'update_fields' is only valid for updates")
            tmp_attachments = None
            if self.account and self.account.version.build < EXCHANGE_2013 and self.attachments:
                # At least some versions prior to Exchange 2013 can't save attachments immediately. You need to first
                # save, then attach. Store the attachment of this item temporarily and attach later.
                tmp_attachments, self.attachments = self.attachments, []
            item = self._create(message_disposition=SAVE_ONLY, send_meeting_invitations=send_meeting_invitations)
            self._id = self.ID_ELEMENT_CLS(item.id, item.changekey)
            for old_att, new_att in zip(self.attachments, item.attachments):
                if old_att.attachment_id is not None:
                    raise ValueError("Old 'attachment_id' is not empty")
                if new_att.attachment_id is None:
                    raise ValueError("New 'attachment_id' is empty")
                old_att.attachment_id = new_att.attachment_id
            if tmp_attachments:
                # Exchange 2007 workaround. See above
                self.attach(tmp_attachments)
        return self

    @require_account
    def _create(self, message_disposition, send_meeting_invitations):
        # Return a BulkCreateResult because we want to return the ID of both the main item *and* attachments
        res = CreateItem(account=self.account).get(
            items=[self],
            folder=self.folder,
            message_disposition=message_disposition,
            send_meeting_invitations=send_meeting_invitations,
            expect_result=message_disposition not in (SEND_ONLY, SEND_AND_SAVE_COPY),
        )
        if res is None:
            return
        return BulkCreateResult.from_xml(elem=res, account=self)

    def _update_fieldnames(self):
        from .contact import Contact, DistributionList
        # Return the list of fields we are allowed to update
        update_fieldnames = []
        for f in self.supported_fields(version=self.account.version):
            if f.name == 'attachments':
                # Attachments are handled separately after item creation
                continue
            if f.is_read_only:
                # These cannot be changed
                continue
            if f.is_required or f.is_required_after_save:
                if getattr(self, f.name) is None or (f.is_list and not getattr(self, f.name)):
                    # These are required and cannot be deleted
                    continue
            if not self.is_draft and f.is_read_only_after_send:
                # These cannot be changed when the item is no longer a draft
                continue
            if f.name == 'message_id' and f.is_read_only_after_send:
                # 'message_id' doesn't support updating, no matter the draft status
                continue
            if f.name == 'mime_content' and isinstance(self, (Contact, DistributionList)):
                # Contact and DistributionList don't support updating mime_content, no matter the draft status
                continue
            update_fieldnames.append(f.name)
        return update_fieldnames

    @require_account
    def _update(self, update_fieldnames, message_disposition, conflict_resolution, send_meeting_invitations):
        if not self.changekey:
            raise ValueError('%s must have changekey' % self.__class__.__name__)
        if not update_fieldnames:
            # The fields to update was not specified explicitly. Update all fields where update is possible
            update_fieldnames = self._update_fieldnames()
        res = UpdateItem(account=self.account).get(
            items=[(self, update_fieldnames)],
            message_disposition=message_disposition,
            conflict_resolution=conflict_resolution,
            send_meeting_invitations_or_cancellations=send_meeting_invitations,
            suppress_read_receipts=True,
            expect_result=message_disposition != SEND_AND_SAVE_COPY,
        )
        if res is None:
            return
        return Item.id_from_xml(res)

    @require_id
    def refresh(self):
        # Updates the item based on fresh data from EWS
        from ..folders import Folder
        additional_fields = {
            FieldPath(field=f) for f in Folder(root=self.account.root).allowed_item_fields(version=self.account.version)
        }

        elem = GetItem(account=self.account).get(items=[self], additional_fields=additional_fields, shape=ID_ONLY)
        res = Folder.item_model_from_tag(elem.tag).from_xml(elem=elem, account=self.account)
        if self.id != res.id and not isinstance(self._id, (OccurrenceItemId, RecurringMasterItemId)):
            # When we refresh an item with an OccurrenceItemId as ID, EWS returns the ID of the occurrence, so
            # the ID of this item changes.
            raise ValueError("'id' mismatch in returned update response")
        for f in self.FIELDS:
            setattr(self, f.name, getattr(res, f.name))
        # 'parent_item' should point to 'self', not 'fresh_item'. That way, 'fresh_item' can be garbage collected.
        for a in self.attachments:
            a.parent_item = self
        del res

    @require_id
    def copy(self, to_folder):
        res = CopyItem(account=self.account).get(
            items=[self],
            to_folder=to_folder,
            expect_result=None,
        )
        if res is None:
            # Assume 'to_folder' is a public folder or a folder in a different mailbox
            return
        return Item.id_from_xml(res)

    @require_id
    def move(self, to_folder):
        res = MoveItem(account=self.account).get(
            items=[self],
            to_folder=to_folder,
            expect_result=None,
        )
        if res is None:
            # Assume 'to_folder' is a public folder or a folder in a different mailbox
            self._id = None
            return
        self._id = self.ID_ELEMENT_CLS(*Item.id_from_xml(res))
        self.folder = to_folder

    def move_to_trash(self, send_meeting_cancellations=SEND_TO_NONE, affected_task_occurrences=ALL_OCCURRENCIES,
                      suppress_read_receipts=True):
        # Delete and move to the trash folder.
        self._delete(delete_type=MOVE_TO_DELETED_ITEMS, send_meeting_cancellations=send_meeting_cancellations,
                     affected_task_occurrences=affected_task_occurrences, suppress_read_receipts=suppress_read_receipts)
        self._id = None
        self.folder = self.account.trash

    def soft_delete(self, send_meeting_cancellations=SEND_TO_NONE, affected_task_occurrences=ALL_OCCURRENCIES,
                    suppress_read_receipts=True):
        # Delete and move to the dumpster, if it is enabled.
        self._delete(delete_type=SOFT_DELETE, send_meeting_cancellations=send_meeting_cancellations,
                     affected_task_occurrences=affected_task_occurrences, suppress_read_receipts=suppress_read_receipts)
        self._id = None
        self.folder = self.account.recoverable_items_deletions

    def delete(self, send_meeting_cancellations=SEND_TO_NONE, affected_task_occurrences=ALL_OCCURRENCIES,
               suppress_read_receipts=True):
        # Remove the item permanently. No copies are stored anywhere.
        self._delete(delete_type=HARD_DELETE, send_meeting_cancellations=send_meeting_cancellations,
                     affected_task_occurrences=affected_task_occurrences, suppress_read_receipts=suppress_read_receipts)
        self._id, self.folder = None, None

    @require_id
    def _delete(self, delete_type, send_meeting_cancellations, affected_task_occurrences, suppress_read_receipts):
        DeleteItem(account=self.account).get(
            items=[self],
            delete_type=delete_type,
            send_meeting_cancellations=send_meeting_cancellations,
            affected_task_occurrences=affected_task_occurrences,
            suppress_read_receipts=suppress_read_receipts,
        )

    @require_id
    def archive(self, to_folder):
        return ArchiveItem(account=self.account).get(items=[self], to_folder=to_folder)

    def attach(self, attachments):
        """Add an attachment, or a list of attachments, to this item. If the item has already been saved, the
        attachments will be created on the server immediately. If the item has not yet been saved, the attachments will
        be created on the server when the item is saved.

        Adding attachments to an existing item will update the changekey of the item.

        Args:
          attachments:

        """
        if not is_iterable(attachments, generators_allowed=True):
            attachments = [attachments]
        for a in attachments:
            if not a.parent_item:
                a.parent_item = self
            if self.id and not a.attachment_id:
                # Already saved object. Attach the attachment server-side now
                a.attach()
            if a not in self.attachments:
                self.attachments.append(a)

    def detach(self, attachments):
        """Remove an attachment, or a list of attachments, from this item. If the item has already been saved, the
        attachments will be deleted on the server immediately. If the item has not yet been saved, the attachments will
        simply not be created on the server the item is saved.

        Removing attachments from an existing item will update the changekey of the item.

        Args:
          attachments:

        """
        if not is_iterable(attachments, generators_allowed=True):
            attachments = [attachments]
        if attachments is self.attachments:
            # Don't remove from the same list we are iterating
            attachments = list(attachments)
        for a in attachments:
            if a.parent_item is not self:
                raise ValueError('Attachment does not belong to this item')
            if self.id:
                # Item is already created. Detach  the attachment server-side now
                a.detach()
            if a in self.attachments:
                self.attachments.remove(a)

    @require_id
    def create_forward(self, subject, body, to_recipients, cc_recipients=None, bcc_recipients=None):
        from .message import ForwardItem
        return ForwardItem(
            account=self.account,
            reference_item_id=ReferenceItemId(id=self.id, changekey=self.changekey),
            subject=subject,
            new_body=body,
            to_recipients=to_recipients,
            cc_recipients=cc_recipients,
            bcc_recipients=bcc_recipients,
        )

    def forward(self, subject, body, to_recipients, cc_recipients=None, bcc_recipients=None):
        self.create_forward(
            subject,
            body,
            to_recipients,
            cc_recipients,
            bcc_recipients,
        ).send()
