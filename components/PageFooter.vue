<template>
    <footer id = "footer" class="footer">
        <div class="container row">
            <div class="footer-col">
                <h4>Последвайте ме</h4>
                <div class="social-links">
                    <a href="http://github.com/iliyansinapov"><i class="fa-brands fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/iliyan-sinapov-b67856213/"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
//TODO: needs a little of reworking /styling wise/
export default {
    name: "PageFooter"
}
</script>

<style scoped>

.footer {
    display: flex;
    justify-content: center;
}

.footer {
    background-color: #151515;
    padding: 80px 0;
}

.container {
    max-width: 1170px;
    margin: auto;

}

.row {
    display: flex;
    flex-wrap: nowrap;
}

ul {
    list-style: none;
}

.footer-col {
    width: 100%;
    padding: 0 15px;
}

.footer-col h4 {
    font-size: 18px;
    color: #FFF;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
}

.footer-col h4::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #fff;
    width: 100%;
    height: 2px;
}

.footer-col ul li:not(:last-child) {
    margin-bottom: 10px;
}

.footer-col ul li a {
    color: #DDD;
    display: block;
    font-size: 1rem;
    font-weight: 300;
    text-transform: capitalize;
    text-decoration: none;
    transition: all 0.3s ease;
}

.footer-col ul li a:hover {
    color: #FFF;
    padding-left: 7px;
}

.social-links {
    display: flex;
    justify-content: center;
}

.footer-col .social-links a {
    color: #FFF;
    background-color: rgba(255, 255, 255, 0.2);
    display: inline-block;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    text-align: center;
    margin: 0 10px 10px 0;
    line-height: 40px;
    transition: all 0.5s ease;
}

.footer-col .social-links a:hover {
    color: #151515;
    background-color: #FFF;
}

@media (max-width: 574px) {
    .footer-col {
        width: 100%;
    }
}
</style>