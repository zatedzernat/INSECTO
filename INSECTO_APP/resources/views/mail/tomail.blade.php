
<h2>INSECTO: There are new problem add to the system</h2></h2>

<p>Date: {{ \Carbon\Carbon::parse($noti->created_at)->format('d/m/Y')}} </p>
<p>Time: {{ \Carbon\Carbon::parse($noti->created_at)->format('H:i:s')}}</p>
<p>----------------------------------------------------------</p>
<p>Item Code: {{ $noti->item->item_code }}</p>
<p>Item Name: {{ $noti->item->item_name }}</p>
<p>Type: {{ $noti->item->item_type->type_name }}</p>
<p>Room: {{ $noti->item->room->room_code }}, {{ $noti->item->room->room_name }}</p>
<p>Building: {{ $noti->item->room->building->building_code }}, {{ $noti->item->room->building->building_name }}</p>
<p>----------------------------------------------------------</p>
<p>Problem ID: {{ $noti->problem_des_id ?? "***New Problem***" }}
<p>Problem Description: {{ $noti->problem_description }}</p>
<p>----------------------------------------------------------</p>
<p>Link: {{ $url }} </p>

