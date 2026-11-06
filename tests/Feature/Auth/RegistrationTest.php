<?php

use App\Models\User;

test('registration screen is not available', function () {
    $this->get(route('register'))->assertNotFound();
});

test('public self-registration is disabled', function () {
    $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertNotFound();

    $this->assertGuest();
    expect(User::where('email', 'test@example.com')->exists())->toBeFalse();
});
