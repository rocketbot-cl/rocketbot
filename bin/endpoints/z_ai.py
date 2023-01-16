# coding: utf-8
# pylint: disable=import-outside-toplevel, invalid-name, too-many-lines, line-too-long, broad-except

import os
import openai

openai.api_key = "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"

@app.route('/getAI', method="POST")
@enable_cors
def getAI():
	"""
		AI endpoint
	"""
	# get from request post data
	question = request.forms.get('question')
	print("AI:",question)
	response = openai.Completion.create(
		model="code-davinci-002",
		prompt= question,
		temperature=0,
		max_tokens=500,
		top_p=1.0,
		frequency_penalty=0.0,
		presence_penalty=0.0,
	)
	print("AI:",response)
	return response.choices[0].text

# connect to copilot
# https://beta.openai.com/docs/api-reference/completions/create
