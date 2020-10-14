<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Http\Models\Item;
use App\Http\Models\Notification_Problem;
use App\Http\Models\Problem_Description;
use Carbon\Carbon;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Notification_Problem::class, function (Faker $faker) {

    $item = new Item();
    $items = $item->findByCancelFlag('N');
    $pluck_item_id = $items->pluck('item_id');

    return [
        'item_id' => $faker->randomElement($array = $pluck_item_id),
        'status_id' => $faker->randomElement($array = array(1, 2, 3, 4, 5, 8)),
        'problem_des_id' => function (array $attributes) use ($faker) {
            $problem_descriptions = Item::find($attributes['item_id'])->item_type->problem_descriptions;
            $pluck_problem_des_id = $problem_descriptions->pluck('problem_des_id');
            return $faker->randomElement($array = $pluck_problem_des_id);
        },
        'problem_description' => function (array $attributes) {
            return Problem_Description::find($attributes['problem_des_id'])->problem_description;
        },
        'service_desk_code' => function (array $attributes) use ($faker) {
            if (in_array($attributes['status_id'], array(2, 3, 4, 5, 8))) {
                return $faker->numberBetween($min = 1000, $max = 2000);
            } else {
                return null;
            }
        },
        'note' => function (array $attributes) {
            if ($attributes['status_id'] === 8) {
                return Str::random(3);
            } else {
                return null;
            }
        },
        'cancel_flag' => 'N',
        'created_at' => $faker->dateTime($max = 'now', $timezone = 'Asia/Bangkok'),
        'updated_at' => Carbon::now(),
        'user_id' => function (array $attributes) use ($faker) {
            if ($attributes['status_id'] === 1) {
                return 6;
            } else {
                return $faker->randomElement($array = array(3, 4, 5));
            }
        },
    ];
});
