document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');

    async function fetchUserInfo(username) {
        const apiUrl = `https://api.github.com/users/${username}`; //logica pra conseguir mudar a url da api de acordo com o seguidor escolhido
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Erro ao tentar acessar a API: ${response.status}`);
            }
            const userInfo = await response.json();
            return userInfo;
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
            return null;
        }
    }

    async function fetchFollowers(username) {
        const apiUrl = `https://api.github.com/users/${username}/followers`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Erro ao tentar acessar a API: ${response.status}`);
            }
            const followers = await response.json();
            return followers;
        } catch (error) {
            console.error('Erro ao obter seguidores:', error);
            return [];
        }
    }

    async function userInfoTela(username) {
        
        await infoUser(username);

        
        const followers = await fetchFollowers(username);
        const containerSeguidores = document.getElementById("seguidoresUser");
        containerSeguidores.innerHTML = '';
        followers.forEach(async follower => {
            await infoUser(follower.login, containerSeguidores);
        });
    }

    async function infoUser(username, container = null) {
        const userInfo = await fetchUserInfo(username);
        if (userInfo) {
            if (!container) {
                container = document.getElementById("infoUsuario");
            }
            const divUsuario = document.createElement("div");
            divUsuario.innerHTML = `
                <img class="imgSeguidor" src="${userInfo.avatar_url}" alt="Foto do seguidor">
                <div class="infoUsuario">
                    <h3 class="inform">${userInfo.location}</h3>
                    <h1 class="nomeSeguidor">${userInfo.name}</h1>
                    <p class="seguidor">${userInfo.bio}</p>
                </div>
            `; //utilizado mesma logica do antigo porq deu certo tb, ent só continuei
            container.appendChild(divUsuario);
        } else {
            console.error(`Usuário ${username} não encontrado.`);
        }
    }

    await userInfoTela(username);
});