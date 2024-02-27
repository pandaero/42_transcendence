import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
import sys

def logprint(*args, **kwargs):
	print(*args, file=sys.stderr, **kwargs)


class chatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		logprint("connected")
		await self.accept()

	async def disconnect(self, close_code):
		logprint(f'disconnected: {close_code}')
	
	async def receive(self, text_data):
		try:
			chatJSON = json.loads(text_data)
			message = chatJSON["message"]
			user = chatJSON["username"]
			logprint(f"Received message: {message} from user: {user}")
		except json.JSONDecodeError:
			logprint(f"Invalid JSON: {text_data}")

		# text_data_json = json.loads(text_data)

		#json.dumps is a module to convert python object into a json string
		await self.send(text_data)