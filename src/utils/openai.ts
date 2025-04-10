export async function generateImage(prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `Um casal: ${prompt}`,
      n: 1,
      size: "512x512",
      model: "dall-e-3",
    }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error?.message || "Erro desconhecido");

  return data.data[0].url;
}
