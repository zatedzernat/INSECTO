# the filter method receives an event and must return a list of events.
# Dropping an event means not including it in the return array,
# while creating new ones only requires you to add a new instance of
# LogStash::Event to the returned array

def filter(event)

# building
building_code = event.get("building_code")
building_name = event.get("building_name")

# room
room_code = event.get("room_code")
room_name = event.get("room_name")
room = {
   "room_code" => room_code,
   "room_name" => room_name,
   "building" => {
      "building_code" => building_code,
      "building_name" => building_name
   }
}

# item
item_code = event.get("item_code")
type_name = event.get("type_name")
group = event.get("group")
brand_name = event.get("brand_name")
serial_number = event.get("serial_number")
model = event.get("model")
itemnote = event.get("itemnote")
item = {
   "item_code" => item_code,
   "room" => room,
   "type_name" => type_name,
   "group" => group,
   "brand_name" => brand_name,
   "serial_number" => serial_number,
   "model" => model,
   "itemnote" => itemnote,
}
event.set('item', item)
event.remove('item_code')
event.remove('room_code')
event.remove('room_name')
event.remove('building_code')
event.remove('building_name')
event.remove('type_name')
event.remove('group')
event.remove('brand_name')
event.remove('serial_number')
event.remove('model')
event.remove('itemnote')

# user
user_name = event.get("name")
user_email = event.get("email")
user = {
   "user_name" => user_name,
   "user_email" => user_email,
}
event.set('user', user)
event.remove('name')
event.remove('email')

return [event] 
end