(function () {
    const accessKey = 'tim-and-stacy-site-access';
    const passwordHash = '2228fb9fc5cc6a29f70ce8769e26ac072aacfe48e7ecbf8491d08daaf9ab5483';

    if (localStorage.getItem(accessKey) === passwordHash) {
        document.documentElement.classList.remove('site-locked');
        return;
    }

    const gate = document.createElement('div');
    gate.className = 'password-gate';
    gate.innerHTML = `
        <div class="password-gate-card" role="dialog" aria-modal="true" aria-labelledby="password-gate-title">
            <p class="password-gate-kicker">Tim &amp; Stacy</p>
            <h1 id="password-gate-title">Our celebration is coming soon</h1>
            <p>This site is currently private. Please enter the password to continue.</p>
            <form class="password-gate-form">
                <label for="wedding-password">Password</label>
                <div class="password-gate-entry">
                    <input id="wedding-password" name="password" type="password" autocomplete="current-password" required>
                    <button type="submit">Enter</button>
                </div>
                <p class="password-gate-error" aria-live="polite"></p>
            </form>
        </div>`;

    document.body.prepend(gate);
    const form = gate.querySelector('form');
    const input = gate.querySelector('input');
    const error = gate.querySelector('.password-gate-error');

    async function hash(value) {
        const data = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const enteredHash = await hash(input.value);

        if (enteredHash === passwordHash) {
            localStorage.setItem(accessKey, passwordHash);
            document.documentElement.classList.remove('site-locked');
            gate.remove();
            return;
        }

        error.textContent = 'That password didn\'t match. Please try again.';
        input.value = '';
        input.focus();
    });

    input.focus();
}());
