import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { DOCUMENTS } from "../constants";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
あなたはDCSS Technology Japanのシニア・フィールドエンジニアのアシスタントAIです。
以下の役割を果たしてください：
1. フィールドエンジニアからの技術的な質問に簡潔に答える。
2. ユーザーが探している手順書が、登録されているドキュメントリスト内にある場合は、そのドキュメント名を正確に提示する。
3. サーバー、ストレージ、ネットワーク機器の一般的なトラブルシューティングのアドバイスを提供する。
4. 回答は常に日本語で行い、プロフェッショナルかつ丁寧なトーンを維持する。

現在利用可能なドキュメントリスト（ナレッジベース）:
${JSON.stringify(DOCUMENTS.map(d => ({ title: d.title, manufacturer: d.manufacturer, tags: d.tags })))}

ユーザーがリストにない手順を求めた場合は、一般的な知識に基づいて回答しつつ、「現在の手順書リストには見当たりませんが、一般的な手順は以下の通りです」と断ってください。
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      }
    });

    return response.text || "申し訳ありません。回答を生成できませんでした。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "エラーが発生しました。APIキーを確認するか、しばらく待ってから再試行してください。";
  }
};

export interface ExplanationResult {
  text: string;
  sources: { title: string; uri: string }[];
}

export const explainTechnicalTerm = async (term: string): Promise<ExplanationResult> => {
  try {
    const prompt = `
    ITインフラストラクチャ（サーバー、ストレージ、ネットワーク）の文脈において、技術用語「${term}」について解説してください。
    
    要件:
    1. 初心者にもわかりやすく、かつエンジニアとして知っておくべき重要なポイントを含めてください。
    2. この用語が実際の現場作業（交換、設定、トラブルシューティング）でどのように関わってくるか補足してください。
    3. 最新の情報をWeb検索して反映させてください。
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable Google Search Grounding
        temperature: 0.3,
      }
    });

    // Extract text
    const text = response.text || "解説を生成できませんでした。";

    // Extract grounding sources (URLs)
    const sources: { title: string; uri: string }[] = [];
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "参照元リンク",
            uri: chunk.web.uri
          });
        }
      });
    }

    // Deduplicate sources based on URI
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i);

    return { text, sources: uniqueSources };

  } catch (error) {
    console.error("Gemini Explanation Error:", error);
    return {
      text: "情報の取得中にエラーが発生しました。",
      sources: []
    };
  }
};