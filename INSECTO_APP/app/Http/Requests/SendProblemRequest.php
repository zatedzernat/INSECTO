<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendProblemRequest extends FormRequest
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
            'problem_des_id' => 'required',
            'problem_description' => 'required',
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
            'problem_des_id' => 'select problem',
            'problem_description' => 'enter problem description',
        ];
    }

}
