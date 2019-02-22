@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ $session->name }}</div>
                    <div class="card-body">
                        <div id="main"></div>
                        <form method='post' action='/sessions/{{ $session->id }}/drinks'>
                            {{ csrf_field() }}
                            <input required type='number' step='1' min='1' name='amount_cl' placeholder='Amount (cl)'>
                            <select required name='beverage_id'>
                                @foreach($beverages as $beverage)
                                    <option value='{{ $beverage->id }}'>{{ $beverage->name }}
                                        ({{ $beverage->percentage }}%)
                                    </option>
                                @endforeach
                            </select>
                            <input type='submit'>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
