@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ $session->name }}</div>

                    <div class="card-body">
                        <script>
                            var request = new XMLHttpRequest();
                            request.responseType = 'json';
                            request.onreadystatechange = function () {
                                if (request.readyState === 4) {
                                    drinks = request.response;
                                    token = "{{ csrf_token() }}";
                                    sex = "{{ $user->sex }}";
                                    weight = {{ $user->weight }};
                                    renderDrinks();
                                }
                            };
                            request.open("GET", "/sessions/" + {{ $session->id }} +"/drinks/");
                            request.send();
                        </script>
                        <ul id='drink-container'>
                        </ul>
                        <p>
                            Alcohol content: <span id='ebac'>0</span>%.
                        </p>
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
