'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Heart,
  Lock,
  MapPin,
  QrCode,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'

export interface Profile {
  id: number
  name: string
  age: number
  city: string
  region: string
  category: string
  available: boolean
  price: number
  image: string
  images: string[]
  description: string
}

// Apenas o perfil de Mariah
const profiles: Profile[] = [
  {
    id: 1,
    name: 'Mariah',
    age: 23,
    city: 'Guarapari - ES',
    region: 'Praia do Morro',
    category: 'Lifestyle',
    available: true,
    price: 250,
    image: '/profiles/clara-moraes/clara-1.jpg',
    images: [
      '/profiles/clara-moraes/clara-1.jpg',
      '/profiles/clara-moraes/clara-2.jpg',
      '/profiles/clara-moraes/clara-3.jpg',
      '/profiles/clara-moraes/clara-4.jpg',
      '/profiles/clara-moraes/clara-5.jpg',
      '/profiles/clara-moraes/clara-6.jpg',
    ],
    description: 'Espontânea, elegante e de presença cativante para encontros e conversas inesquecíveis.',
  },
]

function ProfileCard({
  profile,
  onBook,
}: {
  profile: Profile
  onBook: (profile: Profile, photoIdx?: number) => void
}) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const images = profile.images && profile.images.length > 0 ? profile.images : [profile.image]

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIndex((prev) => (prev + 1) % images.length)
  }

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <article className="group flex flex-col mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
      <div
        onClick={() => onBook(profile, photoIndex)}
        className="relative mb-3 aspect-[0.78] w-full cursor-pointer overflow-hidden rounded-2xl bg-[#ffe3e7] shadow-sm transition hover:shadow-md"
      >
        <img
          src={images[photoIndex]}
          alt={`Foto de ${profile.name}`}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2.5 sm:p-3 z-10 pointer-events-none">
          <span
            className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-md shadow-xs pointer-events-auto ${
              profile.available ? 'bg-[#ffe1e6]/95 text-[#9f1725]' : 'bg-white/85 text-[#7d4a55]'
            }`}
          >
            {profile.available ? 'Disponível agora' : 'Em breve'}
          </span>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {images.length > 1 && (
              <span className="rounded-full bg-black/60 px-2.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-md">
                {photoIndex + 1}/{images.length} fotos
              </span>
            )}
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Favoritar ${profile.name}`}
              className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-white/80 text-[#9f1725] backdrop-blur-md transition hover:bg-white active:scale-90"
            >
              <Heart size={14} />
            </button>
          </div>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#9f1725] shadow-md transition active:scale-90 hover:bg-white z-10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#9f1725] shadow-md transition active:scale-90 hover:bg-white z-10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Próxima foto"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2.5 sm:bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all shadow-xs ${
                    photoIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Desktop Quick Booking Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onBook(profile, photoIndex)
          }}
          className="hidden sm:flex absolute inset-x-3 bottom-3 items-center justify-center gap-1.5 rounded-full bg-white/95 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9f1725] opacity-0 shadow transition duration-300 group-hover:opacity-100 hover:bg-[#9f1725] hover:text-white z-10"
        >
          Agendar horário · 1 hora · R$ {profile.price},00 <ArrowRight size={13} />
        </button>
      </div>

      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-[-0.02em] truncate text-[#9f1725]">
              {profile.name}, <span className="font-normal text-[#9d6570]">{profile.age}</span>
            </h2>
            <span className="rounded-md bg-[#ffe1e6] px-1.5 py-0.5 text-[10px] font-bold text-[#9f1725]">
              1 hora · R$ {profile.price}
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-[0.08em] text-[#9d6570] truncate">
            <MapPin size={12} className="shrink-0 text-[#c1122f]" /> {profile.city} · {profile.region}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onBook(profile, photoIndex)}
          className="mt-0.5 shrink-0 rounded-full bg-[#9f1725] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#c1122f] active:scale-95 shadow-xs"
        >
          Agendar
        </button>
      </div>
      <p className="mt-1.5 text-xs sm:text-sm leading-5 text-[#7d4a55]">
        {profile.description}
      </p>
    </article>
  )
}

export default function Page() {
  const [city, setCity] = useState('Todas as cidades')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [selected, setSelected] = useState<Profile | null>(null)
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState('hoje')
  const [selectedTime, setSelectedTime] = useState('19:00')
  const [modalStep, setModalStep] = useState<'schedule' | 'pix' | 'confirmed'>('schedule')
  const [copiedPix, setCopiedPix] = useState(false)
  const [pixTimer, setPixTimer] = useState(900) // 15 minutos
  const [loadingPix, setLoadingPix] = useState(false)
  const [pixError, setPixError] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState<string | null>(null)

  // Mini-labels das datas calculados dinamicamente (atualiza a cada renderização do dia)
  const dateShortLabels = useMemo(() => {
    const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
    const today = new Date()
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1)
    const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2)
    const weekdays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
    const weekdaysFull = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
    return {
      hoje: `${today.getDate()} ${months[today.getMonth()]}`,
      amanha: `${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`,
      domingo: `${weekdays[dayAfter.getDay()]} · ${dayAfter.getDate()} ${months[dayAfter.getMonth()]}`,
      domingoLabel: weekdaysFull[dayAfter.getDay()],
    }
  }, [])
  const [currentPixCode, setCurrentPixCode] = useState(
    '00020126580014br.gov.bcb.pix0136seletofatal-mariah-83748295204000053039865404250.005802BR5912Seleto Fatal6009GUARAPARI62070503***6304E8A2'
  )
  const [currentQrCode, setCurrentQrCode] = useState<string | null>(null)

  // Previne scroll do fundo no mobile ao abrir modal
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selected])

  // Timer regressivo do Pix
  useEffect(() => {
    if (modalStep === 'pix' && pixTimer > 0) {
      const interval = setInterval(() => {
        setPixTimer((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [modalStep, pixTimer])

  // Polling automático para verificar se o Pix foi pago na PromissePay
  useEffect(() => {
    if (modalStep !== 'pix' || !transactionId || transactionId.startsWith('demo_')) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/pix/status/${transactionId}`)
        const data = await res.json()
        if (data.status === 'paid') {
          setModalStep('confirmed')
        }
      } catch (err) {
        console.error('Erro ao verificar status do Pix:', err)
      }
    }, 3500)

    return () => clearInterval(interval)
  }, [modalStep, transactionId])

  const visibleProfiles = useMemo(
    () =>
      profiles.filter(
        (profile) =>
          (city === 'Todas as cidades' || profile.city === city) && (!onlyAvailable || profile.available),
      ),
    [city, onlyAvailable],
  )

  function openBooking(profile: Profile, initialPhotoIdx = 0) {
    setSelected(profile)
    setModalPhotoIndex(initialPhotoIdx)
    setSelectedDate('hoje')
    setSelectedTime('19:00')
    setModalStep('schedule')
    setCopiedPix(false)
    setPixTimer(900)
    setTransactionId(null)
    setCurrentQrCode(null)
    setPixError(null)
  }

  async function handleGoToPix() {
    if (!selected) return
    setLoadingPix(true)
    setPixError(null)
    try {
      const res = await fetch('/api/pix/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selected.price,
          description: `Agendamento ${selected.name} - ${dateLabels[selectedDate]} às ${selectedTime}`,
        }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setPixError(data.message || 'Erro ao comunicar com a PromissePay.')
        return
      }

      if (data.id) {
        setTransactionId(data.id)
      }
      if (data.copyPaste) {
        setCurrentPixCode(data.copyPaste)
      }
      if (data.qrCodeBase64) {
        setCurrentQrCode(data.qrCodeBase64)
      }
      setModalStep('pix')
    } catch (err: unknown) {
      console.error('Erro na requisição Pix:', err)
      setPixError('Falha ao conectar com o servidor. Tente novamente.')
    } finally {
      setLoadingPix(false)
    }
  }

  function handleCopyPix() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentPixCode)
      setCopiedPix(true)
      setTimeout(() => setCopiedPix(false), 3000)
    }
  }

  const dateLabels: Record<string, string> = useMemo(() => {
    const fmt = (d: Date, prefix: string) => {
      const day = d.getDate()
      const month = d.toLocaleDateString('pt-BR', { month: 'long' })
      return `${prefix}, ${day} de ${month.charAt(0).toUpperCase() + month.slice(1)}`
    }
    const today = new Date()
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1)
    const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2)
    const weekdays = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
    return {
      hoje: fmt(today, 'Hoje'),
      amanha: fmt(tomorrow, 'Amanhã'),
      domingo: fmt(dayAfter, weekdays[dayAfter.getDay()]),
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#ffffff] text-[#9f1725] selection:bg-[#ffe1e6] selection:text-[#9f1725]">
      {/* Header Sticky */}
      <header className="sticky top-0 z-40 border-b border-[#9f1725]/10 bg-[#ffffff]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 sm:h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-12">
          <a href="#top" className="flex items-center gap-2.5 sm:gap-3" aria-label="Seleto Fatal - início">
            <span className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-[#9f1725] text-[#ffffff] shadow-sm">
              <Sparkles size={14} className="sm:size-[15px]" />
            </span>
            <span className="font-serif text-xl sm:text-[22px] tracking-[-0.03em] font-bold">
              seleto fatal<span className="text-[#c1122f]">.</span>
            </span>
          </a>

          {/* Nav - Apenas Início */}
          <nav className="flex items-center">
            <a
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9f1725] transition hover:text-[#c1122f]"
              href="#top"
            >
              Início
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-8 pt-8 sm:pb-12 sm:pt-12 lg:pt-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 sm:mb-5 flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c1122f]">
              <span className="h-px w-6 sm:w-8 bg-[#c1122f]" /> encontro exclusivo
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl leading-[1.08] sm:leading-[0.95] tracking-[-0.03em] text-[#9f1725]">
              Agende com
              <br />
              <em className="font-serif text-[#c1122f]">Mariah.</em>
            </h1>
            <p className="mt-3.5 sm:mt-6 max-w-md text-sm sm:text-[15px] leading-relaxed text-[#7d4a55]">
              Perfil selecionado e verificado. Escolha o melhor dia e horário para o seu encontro com confirmação rápida e pagamento seguro via Pix.
            </p>
          </div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#9f1725]/15 bg-[#fff1f3]/60 px-3.5 py-2 text-[11px] sm:text-xs text-[#7d4a55] backdrop-blur-xs">
            <ShieldCheck size={16} className="shrink-0 text-[#c1122f]" /> Perfil 100% verificado e fotos reais
          </div>
        </div>
      </section>

      {/* Profiles Section (Apenas Mariah) */}
      <section id="perfis" className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24">
        {/* Barra de Status */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between rounded-2xl border border-[#9f1725]/10 bg-white/70 p-3 sm:p-4 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex size-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-[#7d4a55]">
              Guarapari - ES · Praia do Morro
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#9d6570]">
            <Sparkles size={13} className="text-[#c1122f]" />
            <span className="font-semibold text-[#c1122f]">Disponível para agendamento</span>
          </div>
        </div>

        {/* Card de Mariah com Destaque */}
        <div className="mx-auto max-w-md sm:max-w-lg">
          {visibleProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} onBook={openBooking} />
          ))}
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="border-y border-[#9f1725]/10 bg-[#fff1f3] px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 sm:mb-12 max-w-md">
            <p className="mb-2 sm:mb-4 text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#c1122f]">
              rápido e discreto
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl leading-tight sm:leading-none tracking-[-0.03em]">
              Como agendar o <em>encontro.</em>
            </h2>
          </div>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-3">
            <div className="border-t border-[#9f1725]/20 pt-4 sm:pt-5">
              <span className="font-serif text-2xl sm:text-3xl text-[#c1122f] font-bold">01</span>
              <h3 className="mt-2.5 sm:mt-5 font-serif text-xl sm:text-2xl font-bold">Escolha o horário</h3>
              <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-[#7d4a55]">
                Selecione a data e o horário desejado diretamente na agenda de Mariah.
              </p>
            </div>
            <div className="border-t border-[#9f1725]/20 pt-4 sm:pt-5">
              <span className="font-serif text-2xl sm:text-3xl text-[#c1122f] font-bold">02</span>
              <h3 className="mt-2.5 sm:mt-5 font-serif text-xl sm:text-2xl font-bold">Pague via Pix</h3>
              <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-[#7d4a55]">
                Pague de forma instantânea e 100% segura pelo QR Code ou Pix Copia e Cola.
              </p>
            </div>
            <div className="border-t border-[#9f1725]/20 pt-4 sm:pt-5">
              <span className="font-serif text-2xl sm:text-3xl text-[#c1122f] font-bold">03</span>
              <h3 className="mt-2.5 sm:mt-5 font-serif text-xl sm:text-2xl font-bold">Confirmação</h3>
              <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-[#7d4a55]">
                O contato direto e o WhatsApp de Mariah são liberados para combinar o local e detalhes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="profissional"
        className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 sm:px-6 lg:px-12 py-8 text-xs text-[#9d6570] sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="font-serif text-lg font-bold text-[#9f1725]">
          seleto fatal<span className="text-[#c1122f]">.</span>
        </span>
        <span className="text-[11px] sm:text-xs">
          © 2026 Seleto Fatal · Privacidade · Termos · Denúncias
        </span>
        <a
          href="#top"
          className="inline-flex items-center gap-1 uppercase tracking-[0.12em] text-[#9f1725] hover:text-[#c1122f] transition"
        >
          Voltar ao topo <ArrowRight size={13} />
        </a>
      </footer>

      {/* Modal / Bottom Sheet Mobile Friendly com Fluxo PIX */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Agendar com ${selected.name}`}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        >
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={() => setSelected(null)} />

          <div className="relative z-10 max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white p-5 sm:p-7 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Mobile Drag Indicator */}
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#9f1725]/20 sm:hidden" />

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-[#9f1725]/10 bg-white/90 text-[#9f1725] shadow-sm transition hover:bg-white active:scale-95"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>

            {/* ETAPA 1: SELEÇÃO DE DATA E HORÁRIO */}
            {modalStep === 'schedule' && (
              <>
                {/* Galeria de Fotos no Modal */}
                <div className="space-y-2.5">
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#ffe3e7] shadow-inner">
                    <img
                      src={selected.images?.[modalPhotoIndex] || selected.image}
                      alt={`Foto de ${selected.name}`}
                      className="size-full object-cover"
                    />
                    {selected.images && selected.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setModalPhotoIndex((prev) =>
                              prev > 0 ? prev - 1 : selected.images.length - 1,
                            )
                          }
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#9f1725] shadow-md backdrop-blur-sm transition active:scale-90 hover:bg-white"
                          aria-label="Foto anterior"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setModalPhotoIndex((prev) =>
                              prev < selected.images.length - 1 ? prev + 1 : 0,
                            )
                          }
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#9f1725] shadow-md backdrop-blur-sm transition active:scale-90 hover:bg-white"
                          aria-label="Próxima foto"
                        >
                          <ChevronRight size={16} />
                        </button>
                        <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                          {modalPhotoIndex + 1} / {selected.images.length}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Faixa de Miniaturas */}
                  {selected.images && selected.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                      {selected.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setModalPhotoIndex(idx)}
                          className={`relative size-12 sm:size-14 shrink-0 overflow-hidden rounded-xl border-2 transition active:scale-95 ${
                            modalPhotoIndex === idx
                              ? 'border-[#c1122f] ring-2 ring-[#c1122f]/20 scale-102'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="size-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3 border-b border-[#9f1725]/10 pb-3 pt-1">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c1122f]">
                        Agendamento Exclusivo
                      </p>
                      <h2 className="mt-0.5 font-serif text-2xl sm:text-3xl font-bold text-[#9f1725]">
                        {selected.name}, {selected.age}
                      </h2>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-[#7d4a55]">
                        <MapPin size={12} className="text-[#c1122f]" /> {selected.city} · {selected.region}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#9d6570]">Valor do encontro</span>
                      <p className="font-serif text-2xl font-bold text-[#9f1725]">
                        R$ {selected.price},00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Seleção de Data Interativa */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7f2633]">
                    1. Escolha a data
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDate('hoje')}
                      className={`rounded-xl border p-2.5 text-center text-xs transition active:scale-95 ${
                        selectedDate === 'hoje'
                          ? 'border-[#c1122f] bg-[#ffe1e6]/40 text-[#9f1725] font-bold shadow-xs'
                          : 'border-[#9f1725]/15 bg-white text-[#7d4a55]'
                      }`}
                    >
                      <CalendarDays
                        size={14}
                        className={`mx-auto mb-1 ${
                          selectedDate === 'hoje' ? 'text-[#c1122f]' : 'text-[#9d6570]'
                        }`}
                      />
                      Hoje <span className="block text-[10px] text-[#9d6570]">{dateShortLabels.hoje}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDate('amanha')}
                      className={`rounded-xl border p-2.5 text-center text-xs transition active:scale-95 ${
                        selectedDate === 'amanha'
                          ? 'border-[#c1122f] bg-[#ffe1e6]/40 text-[#9f1725] font-bold shadow-xs'
                          : 'border-[#9f1725]/15 bg-white text-[#7d4a55]'
                      }`}
                    >
                      <CalendarDays
                        size={14}
                        className={`mx-auto mb-1 ${
                          selectedDate === 'amanha' ? 'text-[#c1122f]' : 'text-[#9d6570]'
                        }`}
                      />
                      Amanhã <span className="block text-[10px] text-[#9d6570]">{dateShortLabels.amanha}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDate('domingo')}
                      className={`rounded-xl border p-2.5 text-center text-xs transition active:scale-95 ${
                        selectedDate === 'domingo'
                          ? 'border-[#c1122f] bg-[#ffe1e6]/40 text-[#9f1725] font-bold shadow-xs'
                          : 'border-[#9f1725]/15 bg-white text-[#7d4a55]'
                      }`}
                    >
                      <CalendarDays
                        size={14}
                        className={`mx-auto mb-1 ${
                          selectedDate === 'domingo' ? 'text-[#c1122f]' : 'text-[#9d6570]'
                        }`}
                      />
                      {dateShortLabels.domingoLabel} <span className="block text-[10px] text-[#9d6570]">{dateShortLabels.domingo}</span>
                    </button>
                  </div>
                </div>

                {/* Seleção de Horário Interativa */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7f2633]">
                    2. Escolha o horário
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {['14:00', '16:30', '19:00', '20:30', '21:30', '22:00'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-xs font-medium transition active:scale-95 ${
                          selectedTime === time
                            ? 'border-[#c1122f] bg-[#9f1725] text-white shadow-xs font-bold'
                            : 'border-[#9f1725]/15 bg-white text-[#7d4a55] hover:border-[#c1122f]'
                        }`}
                      >
                        <Clock3 size={13} className={selectedTime === time ? 'text-white' : 'text-[#c1122f]'} />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aviso / Erro da Promisse */}
                {pixError && (
                  <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-800">
                    <p className="font-bold flex items-center gap-1.5 text-red-900">
                      <span className="size-2 rounded-full bg-red-600" /> Resposta da PromissePay:
                    </p>
                    <p className="mt-1 text-red-700">{pixError}</p>
                  </div>
                )}

                {/* Botão de Prosseguir para o Pagamento PIX */}
                <button
                  type="button"
                  disabled={loadingPix}
                  onClick={handleGoToPix}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#9f1725] py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-[#c1122f] active:scale-98 disabled:opacity-75"
                >
                  {loadingPix ? (
                    <>
                      <span className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Gerando Pix Promisse...
                    </>
                  ) : (
                    <>
                      Ir para Pagamento via Pix · R$ {selected.price},00 <ArrowRight size={15} />
                    </>
                  )}
                </button>
                <p className="mt-2.5 pb-2 text-center text-[10px] text-[#9d6570]">
                  Confirmação instantânea e liberação do contato após o Pix
                </p>
              </>
            )}

            {/* ETAPA 2: PAGAMENTO VIA PIX */}
            {modalStep === 'pix' && (
              <div className="pt-1">
                {/* Voltar para Horários */}
                <button
                  type="button"
                  onClick={() => setModalStep('schedule')}
                  className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-[#7d4a55] hover:text-[#9f1725] transition"
                >
                  <ChevronLeft size={16} /> Alterar horário ou data
                </button>

                <div className="rounded-2xl border border-[#9f1725]/15 bg-[#fff8f9] p-4 text-center">
                  <div className="flex items-center justify-between border-b border-[#9f1725]/10 pb-3">
                    <div className="text-left">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#c1122f]">
                        Encontro com {selected.name}
                      </p>
                      <p className="text-xs font-semibold text-[#7d4a55]">
                        {dateLabels[selectedDate]} às {selectedTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-[#9d6570]">Total Pix</span>
                      <p className="font-serif text-xl font-bold text-[#9f1725]">
                        R$ {selected.price},00
                      </p>
                    </div>
                  </div>

                  {/* QR Code Pix Estilizado / Real Promisse */}
                  <div className="py-4">
                    <div className="mx-auto size-48 sm:size-52 rounded-2xl border-2 border-[#9f1725]/20 bg-white p-3 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                      {currentQrCode ? (
                        <img
                          src={
                            currentQrCode.startsWith('data:')
                              ? currentQrCode
                              : `data:image/png;base64,${currentQrCode}`
                          }
                          alt="QR Code Pix"
                          className="size-full object-contain p-1"
                        />
                      ) : (
                        /* SVG Representação Visual do QR Code Oficial do Pix */
                        <svg
                          className="size-full text-[#9f1725]"
                          viewBox="0 0 100 100"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Padrões de canto do QR Code */}
                          <rect x="5" y="5" width="26" height="26" fill="#9f1725" rx="3" />
                          <rect x="9" y="9" width="18" height="18" fill="white" rx="2" />
                          <rect x="13" y="13" width="10" height="10" fill="#9f1725" rx="1" />

                          <rect x="69" y="5" width="26" height="26" fill="#9f1725" rx="3" />
                          <rect x="73" y="9" width="18" height="18" fill="white" rx="2" />
                          <rect x="77" y="13" width="10" height="10" fill="#9f1725" rx="1" />

                          <rect x="5" y="69" width="26" height="26" fill="#9f1725" rx="3" />
                          <rect x="9" y="73" width="18" height="18" fill="white" rx="2" />
                          <rect x="13" y="77" width="10" height="10" fill="#9f1725" rx="1" />

                          {/* Blocos de dados simulados */}
                          <rect x="36" y="8" width="6" height="6" fill="#9f1725" />
                          <rect x="46" y="8" width="6" height="6" fill="#9f1725" />
                          <rect x="56" y="8" width="6" height="6" fill="#9f1725" />
                          <rect x="36" y="18" width="6" height="6" fill="#9f1725" />
                          <rect x="50" y="18" width="10" height="6" fill="#9f1725" />

                          <rect x="8" y="36" width="6" height="6" fill="#9f1725" />
                          <rect x="18" y="36" width="6" height="6" fill="#9f1725" />
                          <rect x="8" y="48" width="6" height="8" fill="#9f1725" />
                          <rect x="18" y="48" width="8" height="6" fill="#9f1725" />

                          <rect x="69" y="36" width="8" height="6" fill="#9f1725" />
                          <rect x="82" y="36" width="8" height="6" fill="#9f1725" />
                          <rect x="72" y="48" width="14" height="6" fill="#9f1725" />

                          <rect x="36" y="69" width="8" height="8" fill="#9f1725" />
                          <rect x="48" y="69" width="6" height="8" fill="#9f1725" />
                          <rect x="58" y="69" width="6" height="6" fill="#9f1725" />
                          <rect x="36" y="82" width="12" height="6" fill="#9f1725" />
                          <rect x="52" y="82" width="12" height="8" fill="#9f1725" />

                          <rect x="69" y="69" width="8" height="8" fill="#9f1725" />
                          <rect x="81" y="69" width="8" height="6" fill="#9f1725" />
                          <rect x="69" y="81" width="6" height="8" fill="#9f1725" />
                          <rect x="80" y="80" width="10" height="10" fill="#9f1725" />

                          {/* Centro com símbolo Pix */}
                          <circle cx="50" cy="50" r="14" fill="#00b494" />
                          <path
                            d="M45 46.5L47.5 44L52 48.5L47.5 53L45 50.5L47.5 48L45 46.5ZM55 46.5L52.5 44L48 48.5L52.5 53L55 50.5L52.5 48L55 46.5Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Status de aguardo com timer */}
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#ffe1e6] px-3.5 py-1 text-xs font-semibold text-[#9f1725]">
                      <span className="size-2 rounded-full bg-[#c1122f] animate-ping" />
                      Aguardando pagamento · Expira em{' '}
                      {Math.floor(pixTimer / 60)
                        .toString()
                        .padStart(2, '0')}
                      :{(pixTimer % 60).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Campo Copia e Cola */}
                  <div className="mt-2 text-left">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#7d4a55] block mb-1">
                      Código Pix Copia e Cola
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={currentPixCode}
                        className="w-full rounded-xl border border-[#9f1725]/20 bg-white px-3 py-2.5 text-xs text-[#7d4a55] outline-none select-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className={`shrink-0 flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition active:scale-95 ${
                          copiedPix
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#9f1725] text-white hover:bg-[#c1122f]'
                        }`}
                      >
                        {copiedPix ? (
                          <>
                            <Check size={14} /> Copiado!
                          </>
                        ) : (
                          <>
                            <Copy size={14} /> Copiar
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Passo a passo */}
                  <div className="mt-4 rounded-xl bg-white p-3 text-left border border-[#9f1725]/10">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#9f1725] mb-1.5">
                      Como pagar:
                    </p>
                    <ol className="text-xs text-[#7d4a55] space-y-1 list-decimal list-inside leading-relaxed">
                      <li>Abra o aplicativo do seu banco (Nubank, Itaú, etc.).</li>
                      <li>Escolha a opção **Pix** e selecione **Pix Copia e Cola** ou Ler QR Code.</li>
                      <li>Cole o código copiado e confirme o pagamento de R$ {selected.price},00.</li>
                      <li>Clique no botão abaixo assim que concluir a transferência.</li>
                    </ol>
                  </div>
                </div>

                {/* Botão de confirmação manual */}
                <button
                  type="button"
                  onClick={() => setModalStep('confirmed')}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-emerald-700 active:scale-98"
                >
                  <CheckCircle2 size={16} /> Já fiz o pagamento via Pix
                </button>

                <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-[#9d6570]">
                  <Lock size={12} className="text-emerald-600" />
                  Ambiente seguro e criptografado · Liberação imediata
                </div>
              </div>
            )}

            {/* ETAPA 3: PAGAMENTO CONFIRMADO */}
            {modalStep === 'confirmed' && (
              <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                  <Check size={32} />
                </span>
                <h2 className="mt-5 font-serif text-2xl sm:text-3xl font-bold text-[#9f1725]">
                  Pagamento Confirmado!
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-xs sm:text-sm leading-relaxed text-[#7d4a55]">
                  Seu encontro com <strong>{selected.name}</strong> está confirmado para{' '}
                  <strong>{dateLabels[selectedDate]}</strong> às <strong>{selectedTime}</strong>.
                </p>

                {/* Card de contato liberado */}
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 text-left max-w-sm mx-auto">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800">
                    Contato Direto Liberado
                  </p>
                  <p className="mt-1 text-xs text-emerald-950 font-medium">
                    WhatsApp exclusivo de Mariah:
                  </p>
                  <p className="mt-0.5 text-base font-bold text-emerald-900 font-mono">
                    +55 (21) 99842-1049
                  </p>
                  <a
                    href="https://wa.me/5521998421049"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Conversar com Mariah no WhatsApp <ArrowRight size={14} />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-6 rounded-full border border-[#9f1725]/20 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#7d4a55] hover:bg-[#fff1f3] transition"
                >
                  Fechar janela
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
