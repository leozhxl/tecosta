'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  X,
} from 'lucide-react'

const whatsappNumber = '5548992911109'
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá%2C%20gostaria%20de%20agendar%20uma%20avaliação.`

const treatments = [
  ['Criomodelagem', 'Tecnologia e estratégia para redefinir contornos com segurança e precisão.', '❄'],
  ['Drenagem Linfática', 'O toque Renata França que ativa a circulação e devolve leveza ao corpo.', '◌'],
  ['Ozonioterapia', 'Cuidado integrativo para estimular vitalidade, equilíbrio e bem-estar.', '✦'],
  ['Modelagem Corporal', 'Protocolos personalizados para valorizar a sua melhor versão.', '◒'],
  ['Protocolos de Longevidade', 'Uma visão completa para cuidar da pele, do corpo e da energia.', '∞'],
]

const testimonials = [
  ['Saí da primeira avaliação me sentindo verdadeiramente acolhida. O resultado foi incrível e o cuidado, ainda mais.', 'Mariana S.'],
  ['A Te tem um olhar muito especial. Meu corpo mudou, mas principalmente a forma como eu me sinto nele.', 'Camila R.'],
  ['Tecnologia, conhecimento e um atendimento impecável. É o meu momento favorito da semana.', 'Fernanda A.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [comparison, setComparison] = useState(53)
  const [testimonial, setTestimonial] = useState(0)
  const [formSent, setFormSent] = useState(false)

  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const nome = String(data.get('nome') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const mensagem = String(data.get('mensagem') ?? '').trim()
    const texto = [`Olá, Te! Meu nome é ${nome}.`, mensagem, `E-mail: ${email}`].filter(Boolean).join('\n\n')
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer')
    setFormSent(true)
    e.currentTarget.reset()
  }

  const closeMenu = () => setMenuOpen(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const targets = document.querySelectorAll<HTMLElement>(
      '.section-copy, .portrait-wrap, .section-heading, .treatment-card, .comparison, .differential, .testimonial-layout > *, .contact-grid > *, .footer-cta, .footer-grid > *'
    )
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    targets.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(el.tagName)) : []
      el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 5) * 90}ms`)
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <main className="site-shell">
      <div className="topbar">
        <div className="container topbar-inner">
          <span><Phone size={13} /> (48) 99291-1109</span>
          <span className="topbar-center">Atendimento com hora marcada</span>
          <a href="https://www.instagram.com/tecosta.esteta/" target="_blank" rel="noreferrer"><Camera size={13} /> @tecosta.esteta</a>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="TE COSTA - início" onClick={closeMenu}>
            <img className="brand-logo" src="/logo-te-costa.png" alt="Logo Te Costa" />
            <span className="brand-copy"><strong>TE COSTA</strong><small>ALTA PERFORMANCE & LONGEVIDADE</small></span>
          </a>
          <nav className={`desktop-nav ${menuOpen ? 'mobile-open' : ''}`} aria-label="Navegação principal">
            {['Início', 'Sobre', 'Tratamentos', 'Resultados', 'Depoimentos', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`} onClick={closeMenu}>{item}</a>
            ))}
          </nav>
          <a className="button button-primary header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Agendar avaliação <ArrowRight size={15} /></a>
          <button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" />
        <div className="container hero-content">
          <p className="eyebrow">ESTÉTICA CLÍNICA INTEGRATIVA</p>
          <h1>Beleza, performance<br /><em>e longevidade.</em></h1>
          <p className="hero-text">Tratamentos estéticos personalizados com ciência, tecnologia e cuidado integrativo.</p>
          <p className="credentials">Esteta Clínica <i /> Criomodelagem <i /> Método Renata França <i /> Ozonioterapia</p>
          <div className="hero-actions"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Agendar minha avaliação <ArrowRight size={17} /></a><a className="button button-outline" href="#tratamentos">Conheça os tratamentos</a></div>
        </div>
        <div className="hero-scroll"><span /> role para explorar</div>
      </section>

      <section className="intro-section" id="sobre">
        <div className="container intro-grid">
          <div className="portrait-wrap"><img src="/te-costa.jpg" alt="Te Costa, esteta clínica" /><span className="portrait-caption">Cuidado que transforma<br /><b>de dentro para fora.</b></span></div>
          <div className="section-copy modern-copy"><p className="eyebrow">SOBRE A TE COSTA</p><h2>Um olhar inteiro<br /><em>para você.</em></h2><p className="about-lead">Sou Te Costa, Esteta Clínica apaixonada por unir conhecimento, tecnologia e sensibilidade. Acredito que resultados verdadeiros nascem quando tratamos o corpo com respeito, estratégia e um olhar individualizado.</p><p>Minha missão é criar um espaço onde você se sinta segura para desacelerar, se reconectar e investir na sua melhor versão — com naturalidade e propósito.</p><div className="credentials-list"><span><strong>CRTH-BR</strong><small>10616</small></span><span><strong>PÓS-GRADUADA</strong><small>Medicina Funcional Integrativa</small></span><span><strong>FORMAÇÃO</strong><small>Renata França</small></span></div><a className="text-link" href="#contato">Conheça minha abordagem <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <section className="treatments-section" id="tratamentos"><div className="container"><div className="section-heading"><div><p className="eyebrow">CUIDADO PERSONALIZADO</p><h2>Tratamentos que<br /><em>respeitam sua essência.</em></h2></div><p className="heading-note">Cada protocolo nasce da escuta. Porque o seu corpo merece mais do que um padrão: merece uma estratégia feita para você.</p></div><div className="treatments-grid">{treatments.map(([name, desc, icon], index) => <article className="treatment-card" key={name}><span className="treatment-icon">{icon}</span><span className="card-number">0{index + 1}</span><h3>{name}</h3><p>{desc}</p><a href="#contato" aria-label={`Saiba mais sobre ${name}`}><ArrowRight size={16} /></a></article>)}</div></div></section>

      <section className="results-section" id="resultados"><div className="container results-grid"><div className="section-copy modern-copy"><p className="eyebrow">RESULTADOS REAIS</p><h2>A sua evolução,<br /><em>visível e sentida.</em></h2><p className="about-lead">Mais do que medidas, celebramos a confiança que você recupera. Os resultados apresentados são individuais e podem variar de acordo com cada organismo e protocolo.</p></div><div className="comparison" style={{ '--comparison': `${comparison}%` } as React.CSSProperties}><img src="/resultado-depois.jpg" alt="Abdômen depois do tratamento" /><div className="comparison-before"><img src="/resultado-antes.jpg" alt="Abdômen antes do tratamento" /></div><span className="label label-before">ANTES</span><span className="label label-after">DEPOIS</span><input aria-label="Controle de comparação antes e depois" type="range" min="0" max="100" value={comparison} onChange={(e) => setComparison(Number(e.target.value))} /><span className="comparison-handle"><Minus size={16} /></span></div></div></section>

      <section className="differentials"><div className="container"><div className="section-heading centered"><p className="eyebrow">A EXPERIÊNCIA TE COSTA</p><h2>Seu tempo. Seu corpo.<br /><em>Seu momento.</em></h2></div><div className="differential-grid">{[['01', 'Atendimento personalizado', 'Cada encontro é desenhado para as suas necessidades, objetivos e ritmo.'], ['02', 'Abordagem integrativa', 'O corpo é um sistema. Cuidamos do todo para resultados que permanecem.'], ['03', 'Tecnologia & técnica', 'Métodos seguros, atualizados e combinados com a experiência das mãos.'], ['04', 'Acolhimento genuíno', 'Um ambiente para respirar, confiar e se sentir bem na própria pele.']].map(([num, title, desc]) => <div className="differential" key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></div></section>

      <section className="testimonials" id="depoimentos"><div className="container testimonial-layout"><div><p className="eyebrow">QUEM VIVE, COMPARTILHA</p><h2>Palavras que<br /><em>fazem sentido.</em></h2><div className="rating"><span className="stars">★★★★★</span><span><b>5.0</b> avaliação média das pacientes</span></div></div><div className="testimonial-card" key={testimonial}><span className="quote-mark" aria-hidden="true">“</span><p>{testimonials[testimonial][0]}</p><div className="testimonial-author"><span className="author-avatar">{testimonials[testimonial][1][0]}</span><span><b>{testimonials[testimonial][1]}</b><small>Paciente Te Costa</small></span></div><div className="testimonial-controls"><div className="testimonial-dots">{testimonials.map((_, i) => <button key={i} className={i === testimonial ? 'active' : ''} aria-label={`Ver depoimento ${i + 1}`} onClick={() => setTestimonial(i)} />)}</div><div className="testimonial-arrows"><button aria-label="Depoimento anterior" onClick={() => setTestimonial((testimonial + testimonials.length - 1) % testimonials.length)}><ArrowLeft size={18} /></button><button aria-label="Próximo depoimento" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)}><ArrowRight size={18} /></button></div></div></div></div></section>

      <section className="contact-section" id="contato"><div className="container contact-grid"><div><p className="eyebrow">VAMOS CONVERSAR?</p><h2>O primeiro passo<br /><em>começa aqui.</em></h2><p className="contact-lead">Conte um pouco sobre você e seus objetivos. Será um prazer te receber.</p><div className="contact-details"><span><MapPin size={18} /><span>Sombrio<br />Santa Catarina</span></span><span><Phone size={18} /><span>(48) 99291-1109<br />Seg a Sex, 8h às 19h</span></span></div></div><form className="contact-form" onSubmit={handleContactSubmit}><label>Seu nome<input name="nome" required placeholder="Como podemos te chamar?" /></label><label>Seu melhor e-mail<input name="email" type="email" required placeholder="voce@email.com" /></label><label>Como podemos ajudar?<textarea name="mensagem" rows={3} placeholder="Conte brevemente sobre seus objetivos..." /></label><button className="button button-primary" type="submit">Enviar mensagem <ArrowRight size={16} /></button>{formSent && <p className="form-feedback" role="status">Abrimos o WhatsApp com a sua mensagem. É só tocar em enviar!</p>}</form></div></section>

      <footer>
        <div className="container footer-cta">
          <div><p className="eyebrow">SUA MELHOR VERSÃO</p><h2>Pronta para <em>começar?</em></h2></div>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Agendar minha avaliação <ArrowRight size={16} /></a>
        </div>
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#inicio"><img className="brand-logo" src="/logo-te-costa.png" alt="Logo Te Costa" /><span className="brand-copy"><strong>TE COSTA</strong><small>ALTA PERFORMANCE & LONGEVIDADE</small></span></a>
            <p>Beleza com propósito.<br />Performance com cuidado.</p>
          </div>
          <div className="footer-col">
            <h4>Navegação</h4>
            {[['Início', 'inicio'], ['Sobre', 'sobre'], ['Tratamentos', 'tratamentos'], ['Resultados', 'resultados'], ['Depoimentos', 'depoimentos'], ['Contato', 'contato']].map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><Phone size={15} /> (48) 99291-1109</a>
            <a href="https://www.instagram.com/tecosta.esteta/" target="_blank" rel="noreferrer"><Camera size={15} /> @tecosta.esteta</a>
            <span><MapPin size={15} /> Sombrio, SC</span>
            <span><Clock size={15} /> Seg a Sex, 8h às 19h</span>
          </div>
          <div className="footer-col">
            <h4>Siga</h4>
            <div className="footer-social"><a href="https://www.instagram.com/tecosta.esteta/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera /></a><a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a></div>
          </div>
        </div>
        <div className="container footer-bottom"><span>CRTH-BR 10616</span><span>© {new Date().getFullYear()} TE COSTA. Todos os direitos reservados.</span><a href="#inicio">Voltar ao topo ↑</a></div>
      </footer>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Agendar pelo WhatsApp"><MessageCircle /></a>
    </main>
  )
}
