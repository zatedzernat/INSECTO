<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProblemDescriptionFormRequest extends FormRequest
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
            'problem_description' => 'required',
            'type_id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'problem_description.required' => 'Problem Description is required!',
            'type_id.required' => 'Type is required!',
        ];
    }
}
