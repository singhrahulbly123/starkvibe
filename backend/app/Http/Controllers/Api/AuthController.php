<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:120'], 'email' => ['required', 'email', 'max:255', 'unique:users,email'], 'phone' => ['nullable', 'string', 'max:30'], 'password' => ['required', 'string', 'min:8']]);

        return $this->tokenResponse(User::create($data));
    }

    public function login(Request $request): JsonResponse
    {
        $data = $request->validate(['email' => ['required', 'email'], 'password' => ['required', 'string']]);
        $user = User::where('email', $data['email'])->first();
        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Email or password is incorrect.'], 422);
        }

        return $this->tokenResponse($user);
    }

    public function google(Request $request): JsonResponse
    {
        $data = $request->validate(['credential' => ['required', 'string']]);
        $clientId = config('services.google.client_id');
        if (blank($clientId)) {
            return response()->json(['message' => 'Google sign-in is not configured.'], 503);
        }

        $response = Http::acceptJson()->timeout(10)->get('https://oauth2.googleapis.com/tokeninfo', [
            'id_token' => $data['credential'],
        ]);
        $token = $response->json();
        $validIssuer = is_array($token) && in_array($token['iss'] ?? null, ['accounts.google.com', 'https://accounts.google.com'], true);
        $isExpired = is_array($token) && isset($token['exp']) && (int) $token['exp'] < now()->timestamp;
        if (! $response->successful() || ! is_array($token) || ($token['aud'] ?? null) !== $clientId || ! $validIssuer || ($token['email_verified'] ?? null) !== 'true' || blank($token['email'] ?? null) || $isExpired) {
            return response()->json(['message' => 'Google sign-in could not be verified.'], 401);
        }

        $user = User::firstOrCreate(
            ['email' => $token['email']],
            [
                'name' => $token['name'] ?? Str::before($token['email'], '@'),
                'phone' => '',
                'password' => Str::random(64),
                'email_verified_at' => now(),
            ],
        );

        return $this->tokenResponse($user);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['user' => $request->user()]);
    }

    public function logout(Request $request): JsonResponse
    {
        if ($request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json(['message' => 'Signed out.']);
    }

    private function tokenResponse(User $user): JsonResponse
    {
        $token = $user->createToken('starkvibe-web');

        return response()->json(['token' => $token->plainTextToken, 'user' => $user]);
    }
}
