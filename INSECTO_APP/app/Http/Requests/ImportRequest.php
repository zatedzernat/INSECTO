<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportRequest extends FormRequest
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
            'import_file' => 'required|mimetypes:application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Please :attribute !!',
            'mime' => 'Please select only .xls and .xlsx',
        ];
    }

    public function attributes()
    {
        return [
            'import_file' => 'select a file',
        ];
    }
}
