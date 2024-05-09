
const url = 'https://api.github.com/users/jjulioCsar';

async function fetchImage() {
    try {
        const response = await fetch(url);
        const usuario = await response.json();
        const imgURL = usuario.avatar_url;
        document.getElementById('imgHome').src = imgURL;
    } catch (error) {
        console.error('Erro ao carregar imagem:', error);
    }
}
async function fetchUserInfo() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao tentar acessar a API: ${response.status}`);
        }
        const usuario = await response.json();
        const infoUserElement = document.querySelector("#infoUsuario");
        if (usuario.name) {
            infoUserElement.innerHTML = `
                <h3 class="inform" id="inform">${usuario.location}</h3>
                <h1 class="userNome" id="userNome">${usuario.name}</h1>
                <p class="userInfo" id="userInfo">${usuario.bio}</p>`;
        } else {
            infoUserElement.innerHTML = "Nome de usuário não encontrado.";
        }
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        const infoUserElement = document.querySelector("#infoUsuario");
        infoUserElement.innerHTML = `Erro ao carregar as informações do usuário`;
    }
}


const apiUrl = 'https://api.github.com/users/jjulioCsar/followers';


async function fetchSeguidores() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao tentar acessar a API do GitHub');
        }
        const usuario = await response.json();
        return usuario;
    } catch (error) {
        console.error('Erro ao obter seguidores:', error);
        return [];
    }
}

async function adicionarSeguidores() {
    const containerSeguidores = document.getElementById("seguidoresUser");
    const seguidores = await fetchSeguidores();
        
    containerSeguidores.innerHTML = ``;
    
    seguidores.forEach(seguidor => {
        const divSeguidor = document.createElement("div");
        divSeguidor.classList.add("seguidor");

        const link = document.createElement("a");
        link.href = `./follower.html?user=${seguidor.login}`; 
        
        const img = document.createElement("img");
        img.classList.add("imgSeguidor");
        img.src = seguidor.avatar_url;
        img.alt = "Imagem do seguidor";
        
        img.addEventListener("mouseover", function() {
            this.style.cursor = "pointer"; //so usei isso aq porq a imagem tava utilizando do url da api com href ao redor ai tive que tirar isso dela e fzr uma funcao pra que ao clicar na imagem redirecionasse -jc (pra se lembrar num futuro)
        });

        img.addEventListener("mouseout", function() {
            this.style.cursor = "default";
        });

        const nomeSeguidor = document.createElement("p");
        nomeSeguidor.classList.add("nomeSeguidor");
        nomeSeguidor.textContent = seguidor.login; //utilizado textcontent porq era mais facil do q utilizadno inner.html (fiquei 3 hrs tentando ate conseguir mudar pro text content)

        link.appendChild(img);
        divSeguidor.appendChild(link);
        divSeguidor.appendChild(nomeSeguidor);

        containerSeguidores.appendChild(divSeguidor);
    });
}





document.addEventListener('DOMContentLoaded', async function() { //muito util pra que tudo seja carregado apos a pagina estar carregada e cada um no seu tempo
    await fetchImage();
    await fetchUserInfo();
    await adicionarSeguidores();
});

