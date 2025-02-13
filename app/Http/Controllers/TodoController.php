<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|unique:todos,title', 
            'done' => 'nullable|boolean',
        ]);
    
        $todo = Todo::create([
            'title' => $request->title,
            'done' => $request->done ?? false,
        ]);
    
        return response()->json($todo, 201);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'title' => "sometimes|required|string|max:255|unique:todos,title,{$todo->id}",
            'done' => 'sometimes|required|boolean',
        ]);
    
        $todo->update($request->only(['title', 'done']));
    
        return response()->json(['message' => 'Todo updated successfully', 'todo' => $todo]);
    }
    



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json(null, 204);
    }
}
