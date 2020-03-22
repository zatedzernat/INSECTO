<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;

class NotiUpdateFormRequest extends FormRequest
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
        if (Request::input('next_status') == 'open') {
            return [
                'help_desk_code' => 'required',
            ];
        } else if (Request::input('next_status') == 'resolved') {
            return [
                'note' => 'required',
            ];
        } else {
            return [];
        }
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
            'help_desk_code' => 'enter Help Desk Code',
            'note' => 'enter Note',
        ];
    }
}
