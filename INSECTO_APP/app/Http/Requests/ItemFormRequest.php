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
            'item_type_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Please :attribute !!',
        ];
    }

    public function attributes()
    {
        return [
            'item_code' => 'enter item code',
            'item_name' => 'enter item name',
            'room_id' => 'enter room name',
            'item_type_id' => 'enter type name'
        ];
    }
}
