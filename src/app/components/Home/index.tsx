'use client'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, ColorPicker, Input, message,QRCode, Upload } from 'antd'
import React, { useEffect, useState } from 'react'

const { TextArea } = Input


export default function HomePage() {
    const [text, setText] = useState('https://qrcode.fabra.dev')
    const [qrCodeSize, setQrCodeSize] = useState<number>(330)
    const [colorQR, setColor] = useState<string>('#ffffff')
    const [colorBg, setColorBg] = useState<string>('#1677ff')
    const [imageUrl, setImageUrl] = useState<string | null>('')
    
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value || 'https://qrcode.fabra.dev')
        
    }

    const updateQrCodeSize = () => {
        const width = window.innerWidth
        if (width > 410) {
            setQrCodeSize(330)
        } else {
            setQrCodeSize(240) // ou outro valor que você preferir para telas menores que 1024px
        }
    }

    useEffect(() => {
        updateQrCodeSize()
        window.addEventListener('resize', updateQrCodeSize)
        return () => window.removeEventListener('resize', updateQrCodeSize)
    }, [])

    const downloadQRCode = () => {
        const qrCodeContainer = document.getElementById('qr-code')
        if (qrCodeContainer) {
            const svgElement = qrCodeContainer.querySelector('svg')
      
            if (!svgElement) {
                message.error('QR Code SVG element not found')
                return
            }

            svgElement.setAttribute('width', '600')
            svgElement.setAttribute('height', '600')
      
            const svgData = new XMLSerializer().serializeToString(svgElement)
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
            const svgUrl = URL.createObjectURL(svgBlob)
      
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                message.error('Failed to create canvas context')
                return
            }
      
            const img = new Image()
            
            img.onload = () => {
                // Define a largura e altura do canvas para 880x880 (800 + 2 * 40) para incluir a borda de 40px
                canvas.width = 800
                canvas.height = 800
      
                // Preenche o canvas com a cor de fundo
                ctx.fillStyle = colorBg
                ctx.fillRect(0, 0, canvas.width, canvas.height)
      
                // Calcula a posição x e y para centralizar o QR code no canvas com a borda
                const x = (canvas.width - img.width) / 2
                const y = (canvas.height - img.height) / 2
      
                // Desenha a imagem SVG no canvas
                ctx.drawImage(img, x, y)
      
                // Converte o conteúdo do canvas para um blob PNG
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob)
      
                        // Cria um link para baixar o arquivo PNG
                        const a = document.createElement('a')
                        a.download = 'QRCode.png'
                        a.href = url
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
      
                        // Revoga o URL para liberar recursos
                        URL.revokeObjectURL(url)
                        URL.revokeObjectURL(svgUrl)
                        message.success('QR Code downloaded successfully')
                    } else {
                        message.error('Failed to create PNG blob')
                    }
                }, 'image/png')
            }
            img.src = svgUrl
        } else {
            message.error('QR Code container not found')
        }
    }

    const handleChange = (info: any) => {
        if (info.file.status === 'done') {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result && typeof e.target.result === 'string') {
                    setImageUrl(e.target.result)
                }
            }
            reader.readAsDataURL(info.file.originFileObj)
        } else if (info.file.status === 'error') {
            console.error(`${info.file.name} upload failed.`)
        }
    }

    const handleChangeRemove = () => {
        setImageUrl('')
    }

    return (
        <>
            <div className="w-full">
                <div className="container">
                    <div className="flex items-center justify-between py-10 max-lg:flex-col max-lg:gap-10 max-lg:py-5">
                        <div className="flex flex-col gap-6 text-sm text-slate-500 max-lg:w-full  max-lg:gap-3">
                            <h1 className="text-3xl font-semibold max-lg:text-center max-lg:text-xl">Generate your custom QR Code</h1>
                            <div className="flex flex-col gap-2">
                                <label>Enter your text</label>
                                <TextArea
                                    showCount
                                    maxLength={200}
                                    onChange={onChangeText}
                                    placeholder="https://qrcode.fabra.dev"
                                    style={{resize: 'none' }}
                                    className="h-[120px] max-lg:h-[60px]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Customize Qr color</label>
                                <ColorPicker
                                    className="!justify-start"
                                    defaultValue="#ffffff"
                                    size="large"
                                    showText
                                    value={colorQR}
                                    onChange={(value, hex) => setColor(hex)}
                                />
                            </div>
                            <span className="flex flex-col gap-2">
                                <label>Customize background</label>
                                <ColorPicker
                                    className="!justify-start"
                                    defaultValue="#267ffb"
                                    size="large"
                                    showText
                                    value={colorBg}
                                    onChange={(value, hex) => setColorBg(hex)}
                                />
                            </span>
    
                            <span className="flex flex-col gap-2">
                                <label>Upload custom image icon</label>
                                <Upload
                                    listType="picture"
                                    multiple={false}
                                    maxCount={1}
                                    onChange={handleChange}
                                    onRemove={handleChangeRemove}
                                    className="flex flex-col"
                                >
                                    <Button
                                        className="w-full flex-1 bg-white"
                                        icon={<UploadOutlined />}
                                        size="large"
                                    >
                                            Click to Upload
                                    </Button>
                                </Upload>
                            </span>
                        </div>
                        <div id="qr-code" className="flex w-96 flex-col items-center justify-center rounded-xl bg-white p-6 shadow-custom max-lg:w-full">
                            <QRCode
                                className="w-full !p-12 max-lg:!p-8"
                                value={text}
                                size={qrCodeSize}
                                color={String(colorQR)}
                                bgColor={String(colorBg)}
                                type="svg"
                                icon={imageUrl ? imageUrl : ''}
                                iconSize={80}
                            />
                            <div className="flex flex-col justify-center">
                                <span className="flex justify-center py-8 text-xl font-semibold text-slate-600">{text }</span>
                                <p className="pb-5 text-center text-slate-400">
                        Enter your TEXT and create your custom Qr Code in a few seconds with a few clicks.
                                </p>
                                <Button
                                    type="primary"
                                    icon={<DownloadOutlined />}
                                    size={'large'}
                                    onClick={downloadQRCode}
                                >
                                Download QRCode
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
