<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;

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
        if (Request::input('problem_des_id') == 'etc') {
            return [
                'item_id' => 'required',
                'problem_des_id' => 'required',
                'problem_description' => 'required',
            ];
        } else {
            return [
                'item_id' => 'required',
                'problem_des_id' => 'required',
            ];
        }
    }

    public function messages()
    {
        return [
            'item_id.required' => 'Item ID is required!',
            'problem_des_id.required' => 'Probelm Des ID is required!',
            'problem_description.required' => 'Probelm Description is required!',
        ];
    }
}
