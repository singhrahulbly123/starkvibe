<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin login — StarkVibe</title>
    <style>
        :root{font-family:Arial,sans-serif;color:#111;background:#f2f0e9}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px}.card{width:min(100%,520px);border:1px solid #bdbbb3;background:#eeece5;padding:36px}p.eyebrow{font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#436d16;font-weight:700}h1{font-size:clamp(48px,9vw,88px);line-height:.85;text-transform:uppercase;margin:18px 0 34px;font-weight:900}label{display:block;font-size:14px;font-weight:700;margin-top:18px}input{display:block;width:100%;height:54px;background:transparent;border:1px solid #111;padding:0 14px;margin-top:8px;font-size:16px}button{margin-top:28px;height:54px;background:#111;color:#fff;border:0;padding:0 24px;font-weight:700;font-size:15px;cursor:pointer}.error{color:#9d1c1c;font-size:14px;margin-top:14px}
    </style>
</head>
<body>
    <main class="card">
        <p class="eyebrow">StarkVibe workspace</p>
        <h1>Admin login.</h1>
        <form method="POST" action="{{ route('admin.authenticate') }}">
            @csrf
            <label for="email">Email</label>
            <input id="email" name="email" type="email" value="{{ old('email') }}" required autofocus autocomplete="email">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required autocomplete="current-password">
            @if ($errors->any())<p class="error">{{ $errors->first() }}</p>@endif
            <button type="submit">Open dashboard</button>
        </form>
    </main>
</body>
</html>
