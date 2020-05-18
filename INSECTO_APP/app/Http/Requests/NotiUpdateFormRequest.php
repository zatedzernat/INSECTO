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
        if (Request::input('next_status_id') == 2 || Request::input('next_status_id') == 7 ) { // status_id = 2 = open / 7 = reopen
            return [
                'next_status_id' => 'required',
                'help_desk_code' => 'required',
            ];
        } else if (Request::input('next_status_id') == 8) { //status_id = 8 = resolved
            return [
                'next_status_id' => 'required',
                'note' => 'required',
            ];
        } else {
            return [
                'next_status_id' => 'required',
            ];
        }
    }

    public function messages()
    {
        return [
            'next_status_id.required' => 'Next Status ID is required!',
            'help_desk_code.required' => 'Help Desk Code is required!',
            'note.required' => 'Note is required!',
        ];
    }
}
