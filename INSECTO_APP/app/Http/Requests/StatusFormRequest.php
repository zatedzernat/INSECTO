<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StatusFormRequest extends FormRequest
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
            'status_name' => 'required',
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
            'status_name' => 'enter status name',
        ];
    }
}
