<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RazorpaySetting extends Model
{
    protected $fillable = ['key_id', 'key_secret'];

    protected function casts(): array
    {
        return ['key_secret' => 'encrypted'];
    }

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
