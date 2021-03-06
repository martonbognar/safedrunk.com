@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header">{{ __('Register') }}</div>

    <div class="card-body">
        <form method="POST" action="{{ route('register') }}">
            @csrf

            <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

                <div class="col-md-6">
                    <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

                    @if ($errors->has('name'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                <div class="col-md-6">
                    <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

                    @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="form-group row">
                <label for="sex" class="col-md-4 col-form-label text-md-right">{{ __('Sex') }}</label>

                <div class="col-md-6">
                    <select id="sex" name="sex" class="form-control{{ $errors->has('sex') ? ' is-invalid' : '' }}" required>
                        <option value="female" {{ old('sex') == "female" ? 'selected' : '' }}>Female</option>
                        <option value="male" {{ old('sex') == "male" ? 'selected' : '' }}>Male</option>
                    </select>

                    @if ($errors->has('sex'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('sex') }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="form-group row">
                <label for="weight" class="col-md-4 col-form-label text-md-right">{{ __('Weight') }}</label>

                <div class="col-md-4">
                    <input id="weight" type="number" class="form-control{{ $errors->has('weight') ? ' is-invalid' : '' }}" name="weight" value="{{ old('weight') }}" required>

                    @if ($errors->has('weight'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('weight') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="col-md-2">
                    <select id="weight_unit" name="weight_unit" class="form-control{{ $errors->has('weight_unit') ? ' is-invalid' : '' }}" required>
                        <option value="kg" {{ old('weight_unit') == "kg" ? 'selected' : '' }}>kg</option>
                        <option value="lbs" {{ old('weight_unit') == "lbs" ? 'selected' : '' }}>lbs</option>
                        <option value="stone" {{ old('weight_unit') == "stone" ? 'selected' : '' }}>stone</option>
                    </select>

                    @if ($errors->has('weight_unit'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('weight_unit') }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                <div class="col-md-6">
                    <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                    @if ($errors->has('password'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="form-group row">
                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>

                <div class="col-md-6">
                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"></label>
                <div class="col-md-6">
                    <div class="form-check">
                        <input type="checkbox" id="newsletter" class="form-check-input" name="newsletter" {{ old('newsletter') ? 'checked' : '' }}><label for="newsletter" class="form-check-label">Notify me about new features on the site</label>
                    </div>
                </div>
            </div>

            <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">
                        {{ __('Register') }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection
