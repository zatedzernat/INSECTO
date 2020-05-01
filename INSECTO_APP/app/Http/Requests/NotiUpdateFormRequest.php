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
        } else if (Request::input('next_status') == 'closed') {
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
            'help_desk_code.required' => 'Help Desk Code is required!',
            'note.required' => 'Note is required!',
        ];
    }
}
