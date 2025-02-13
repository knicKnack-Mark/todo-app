<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validate user input
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ]);

        // Create new user
        $user = User::create([
            'name' => $request->firstName . ' ' . $request->lastName, // Combine first and last name
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        // Generate authentication token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => '',
            'token' => $token,
            'user' => $user
        ], 201);
    }
}
