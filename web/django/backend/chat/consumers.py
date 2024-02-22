import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer

class chatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print("connected")
		await self.accept()

	async def disconnect(self, close_code):
		print(f'disconnected: {close_code}')
	
	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		message = text_data_json['message']

		#json.dumps is a module to convert python object into a json string
		await self.send(text_data=json.dumps({'message': message}))