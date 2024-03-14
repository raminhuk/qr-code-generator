'use client'
import { Button, ColorPicker, Input, QRCode, Upload } from 'antd'
import React, { useState } from 'react'

const { TextArea } = Input


export default function HomePage() {
    const [text, setText] = useState('https://qrcode.fabra.dev')
    const [colorQR, setColor] = useState<string>('#ffffff')
    const [colorBg, setColorBg] = useState<string>('#1677ff')
    
    console.log(colorBg)
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value || 'https://qrcode.fabra.dev')
    }
   
    return (
        <>
            <div className="w-full">
                <div className="container">
                    <div className="flex items-center justify-between py-14">
                        <div className="flex flex-col gap-6 text-sm text-slate-500">
                            <h1 className="text-3xl font-semibold">Generate your custom QR Code</h1>
                            <div className="flex flex-col gap-2">
                                <label>Enter your text</label>
                                <TextArea
                                    showCount
                                    maxLength={200}
                                    onChange={onChangeText}
                                    placeholder="https://qrcode.fabra.dev"
                                    style={{ height: 120, resize: 'none' }}
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
                                <label>Upload custom image</label>
                                <Upload
                                    listType="picture"
                                    multiple={false}
                                    maxCount={1}
                                >
                                    <div className="flex w-[500px] max-w-full">
                                        <Button className="w-full flex-1 bg-white">Click to Upload</Button>
                                    </div>
                                </Upload>
                            </span>
                        </div>
                        <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-white p-6 shadow-custom">
                            <QRCode
                                className="w-full !p-12"
                                value={text}
                                size={330}
                                color={String(colorQR)}
                                bgColor={String(colorBg)}
                            />
                            <div className="flex flex-col justify-center">
                                <span className="flex justify-center py-8 text-xl font-semibold text-slate-600">{text }</span>
                                <p className="pb-5 text-center text-slate-400">
                        Enter your TEXT and create your custom Qr Code in a few seconds with a few clicks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
