<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoomFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'room_code' => 'required',
            'room_name' => 'required',
            'building_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'room_code.required' => 'Room Code is required!',
            'room_name.required' => 'Room Name is required!',
            'building_id.required' => 'Building is required!',
        ];
    }
}
