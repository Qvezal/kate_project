"use client"
import style from './page.module.css'
import Container from '@/Components/std/Container'
import Spacer from '@/Components/std/Spacer'
import Button from '@/Components/std/Button'
import Link from 'next/link'
import { useEffect } from 'react'


export default function Home() {
  useEffect(()=> {
    if (localStorage.getItem("shopname")) {
      window.location.href="/dashboard"
    }
  },[])
  return (
    <Container className={style.page}>
      <Spacer top="2"/>
      <div className={style.description}>
        <span>Надежного партнер для сотрудников и продаж!</span>
      </div>
      <Spacer top="2"/>
      <h1 className={style.main_text}>Ваш личный менеджер у вас под рукой</h1>
      <Spacer top="2"/>
      <h3 className={style.sub_text}>
        Мы понимаем, что эффективное ведение отчетности является ключом к успеху любого бизнеса. 
        Именно поэтому мы предлагаем инновационные решения для автоматизации процесса учета рабочего времени, отслеживания производительности и четкой аналитики продаж.
        <br/><br/>Наша команда экспертов разработала уникальную систему, которая поможет вам максимально оптимизировать рабочий процесс, повысить эффективность работы персонала и улучшить финансовые показатели компании.
        С нашей помощью вы сможете:
      </h3>
      <div className={style.plus}>
        <h3>Автоматизировать учет рабочего времени сотрудников.</h3>
        <h3>Отслеживать производительность каждого сотрудника и всей команды в целом.</h3>
        <h3>Получать подробную аналитику продаж и использовать ее для принятия важных решений.</h3>
        <h3>Экономить время и снижать затраты благодаря оптимизации бизнес-процессов.</h3>
      </div>
      <h3 className={style.sub_text}>
        Мы гарантируем надежность и безопасность хранения данных, а также оперативную техническую поддержку наших клиентов.
        Сделайте свой бизнес еще успешнее с помощью BAI Chat! Свяжитесь с нами уже сегодня и узнайте больше о наших услугах.
      </h3>
      <Spacer top="1"/>
      <Link href="/login">
        <Button>Войти</Button>
      </Link>
    </Container>
  )
}
