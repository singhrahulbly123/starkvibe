<?php

namespace App\Http\Middleware;

use App\Models\ApiToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiTokenAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $plainToken = $request->bearerToken();
        $token = $plainToken ? ApiToken::with('user')->where('token_hash', hash('sha256', $plainToken))->first() : null;

        if (! $token || ($token->expires_at && $token->expires_at->isPast())) {
            return response()->json(['message' => 'Please sign in to continue.'], 401);
        }

        $request->setUserResolver(fn () => $token->user);

        return $next($request);
    }
}
