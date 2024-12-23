import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='footer'>
            <hr />
            <nav className='footer-nav'>
            <div className='col1'>
                    <a href='#about-us'>Sobre nós</a>
                    <a href='#faq'>Perguntas frequentes</a>
                    <a href='#terms'>Termos de uso</a>
                    <a href='#privacy'>Política de privacidade</a>
                </div>
                <div className='col2'>
                    <a href='#benefits-mission'>Benefícios sociais</a>
                    <a href='#how-it-works'>Como Funciona</a>
                    <a href='#benefits-participants'>Benefícios para os participantes</a>
                    <a href='#contact'>Entre em contato conosco</a>
                </div>
                <div className='col3'>
                    <a href='#register'>Registre-se</a>
                    <a href='#login'>Entrar</a>
                    <a href='#users'>Conheça os usuários da Ponte de Gerações</a>
                </div>
            </nav>
            <hr />
            <div className='credits'>
                <h1>
                    <Link to={"/"} className="footer-nav-title">
                        {" "}
                        Ponte de Gerações{" "}
                    </Link>
                </h1>
                <p> &copy; 2024 Ponte de Gerações. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;