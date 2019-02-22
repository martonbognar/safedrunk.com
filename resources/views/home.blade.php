@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Dashboard</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <ul>
                            @foreach($sessions as $session)
                                <li><a href='/sessions/{{ $session->id }}'>{{ $session->name }}</a></li>
                            @endforeach
                        </ul>
                        <form method='post' action='/sessions/'>
                            {{ csrf_field() }}
                            <input type='text' name='name' id='name' placeholder='Name'>
                            <input type='submit'>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
