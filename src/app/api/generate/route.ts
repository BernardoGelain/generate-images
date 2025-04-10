import { NextRequest, NextResponse } from "next/server";

const descriptionHim = `Homem jovem com pele clara levemente rosada, rosto quadrado e mandíbula bem definida, e musculoso. Cabelos castanho-escuros, penteados para trás com leve volume frontal, estilo clássico. Sobrancelhas espessas e retas, olhos claros e puxados, expressão observadora. Bigode bem aparado e barba rala. Veste camisa branca com colarinho aberto, blazer escuro bem cortado.`;

const descriptionHer = `Mulher jovem com pele clara e quase bronzeada, rosto oval e simétrico. Cabelos longos e escuros com cachos largos, repartidos ao meio. Sobrancelhas bem delineadas, olhos grandes com delineado gatinho e íris verde ou mel. Lábios carnudos. Veste peça que deixa os ombros à mostra, com colar delicado e aparência feminina marcante.`;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt obrigatório" }, { status: 400 });
  }

  const fullPrompt = `Um casal formado por: ${descriptionHim} ${descriptionHer}, imagine-os no seguinte cenario, lembre-se deve ser cotidiano e podem estar em qualquer posiçao, nao necessariamente de frente, o mais importante é que eles estejam: ${prompt}`;

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro da OpenAI:", data);
      return NextResponse.json({ error: data.error?.message || "Erro ao gerar imagem" }, { status: 500 });
    }

    return NextResponse.json({ image_url: data.data[0].url });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
