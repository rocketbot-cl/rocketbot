from unittest import mock

from keyring import errors


class DeletionDetector:
    def __init__(self, state):
        self.state = state
        self.state.deleted = False

    def __del__(self):
        self.state.deleted = True


class TestExceptionInfo:
    def test_traceback_not_referenced(self):
        """
        Ensure that an ExceptionInfo does not keep a reference
        to the traceback, as doing so can create unintended
        side effects. See #386 for more info.
        """
        state = mock.MagicMock()
        _ = errors.ExceptionInfo(None, None, DeletionDetector(state))
        assert state.deleted
