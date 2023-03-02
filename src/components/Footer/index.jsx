import './style.css'
export default function Footer (){

    return (
        <>
            <footer className='footer'>
                <p className='footer__text'>Виконано в
                    <a href="https://prometheus.org.ua/" className='footer__text--link' target='_blank'> Prometheus </a>
                    &copy; 2022
                </p>

            </footer>
        </>

    )
}