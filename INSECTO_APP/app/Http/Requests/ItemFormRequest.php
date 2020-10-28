<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemFormRequest extends FormRequest
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
            'item_code' => 'required',
            'item_name' => 'required',
            'room_id' => 'required',
            'type_id' => 'required',
            'group' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'item_code.required' => 'Item Code is required!',
            'item_name.required' => 'Item Name is required!',
            'room_id.required' => 'Room is required!',
            'type_id.required' => 'Type is required!',
            'group.required' => 'Group is required!'
        ];
    }
}
