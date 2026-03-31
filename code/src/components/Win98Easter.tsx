import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

type Win98EasterProps = {
  isActive: boolean
  onClose: () => void
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

const routeLabels: Record<string, string> = {
  '/': '主页',
  '/about': '关于',
  '/blog': '博客',
  '/contact': '联系',
  '/friends': '朋友',
  '/travels': '旅行',
}

export default function Win98Easter({ isActive, onClose }: Win98EasterProps) {
  const { pathname } = useLocation()
  const [clock, setClock] = useState(() => formatTime(new Date()))
  const [isDialogOpen, setIsDialogOpen] = useState(true)

  useEffect(() => {
    if (isActive) {
      setIsDialogOpen(true)
    }
  }, [isActive])

  useEffect(() => {
    if (!isActive) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setClock(formatTime(new Date()))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [isActive])

  const pageLabel = useMemo(() => {
    if (pathname.startsWith('/blog/')) {
      return '博客文章'
    }

    return routeLabels[pathname] ?? '当前窗口'
  }, [pathname])

  if (!isActive || !document.documentElement.classList.contains('win98')) {
    return null
  }

  return (
    <>
      {isDialogOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 pointer-events-none">
          <div className="win98-window pointer-events-auto w-full max-w-[520px]">
            <div className="win98-titlebar flex items-center justify-between gap-3 px-2 py-1">
              <div className="flex items-center gap-2 text-sm font-bold">
                <span className="win98-logo" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <span>Windows 98</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="win98-title-button flex h-6 w-6 items-center justify-center text-xs font-bold"
                aria-label="关闭 Windows 98 彩蛋"
              >
                X
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <div className="win98-inset flex items-start gap-4 bg-[#c0c0c0] p-4">
                <div className="win98-alert-icon flex h-10 w-10 shrink-0 items-center justify-center text-2xl leading-none">
                  <span aria-hidden="true">!</span>
                </div>
                <div className="space-y-3 text-sm leading-6 text-black">
                  <p className="font-bold">欢迎使用 Windows 98！</p>
                  <p>欢迎回来～ 现在1980年</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="min-w-[96px] px-4 py-1.5 text-sm"
                >
                  确定
                </button>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="min-w-[96px] px-4 py-1.5 text-sm"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="win98-taskbar fixed inset-x-0 bottom-0 z-[80] flex h-10 items-center gap-1 px-1.5">
        <button type="button" className="win98-task-button flex items-center gap-1 px-3 py-1 text-sm font-bold">
          <span className="win98-logo" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>开始</span>
        </button>

        <div className="win98-task-button win98-task-button--active min-w-0 flex-1 px-3 py-1 text-sm">
          <span className="block truncate">{pageLabel}</span>
        </div>

        <div className="win98-taskbar-divider h-6 w-px" aria-hidden="true" />

        <div className="win98-inset min-w-[72px] px-3 py-1 text-center text-sm tabular-nums">
          {clock}
        </div>
      </div>
    </>
  )
}
