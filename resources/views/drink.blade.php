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

                        <form method='post' action='/beverages/'>
                            {{ csrf_field() }}
                            <input type='text' name='name' id='name' placeholder='Name'>
                            <input type='number' name='percentage' id='percentage' placeholder='Percentage' min='0' max='100' step='0.1'>
                            <input type='checkbox' id='review' name='review'><label for='review'>Submit as an official drink</label>
                            <input type='submit'>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
