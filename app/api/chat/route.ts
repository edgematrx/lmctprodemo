import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Simple response for now - can be enhanced with actual AI integration
    const lastMessage = messages[messages.length - 1]?.content || ""
    
    let response = ""
    
    if (lastMessage.toLowerCase().includes("listing") || lastMessage.toLowerCase().includes("ad")) {
      response = "I can help you create compelling vehicle listings! Here are some tips:\n\n1. Start with the year, make, model, and variant\n2. Highlight key features and recent services\n3. Be honest about condition\n4. Include odometer reading and rego status\n5. Mention warranty if applicable\n\nWould you like me to help write a specific listing?"
    } else if (lastMessage.toLowerCase().includes("price") || lastMessage.toLowerCase().includes("value")) {
      response = "For pricing advice, consider:\n\n1. Check recent sales of similar vehicles\n2. Factor in condition, mileage, and service history\n3. Consider market demand for the make/model\n4. Account for any unique features or modifications\n5. Leave room for negotiation (usually 5-10%)\n\nWhat vehicle are you trying to price?"
    } else if (lastMessage.toLowerCase().includes("comply") || lastMessage.toLowerCase().includes("legal")) {
      response = "As an LMCT dealer, key compliance points include:\n\n1. Display accurate pricing including all fees\n2. Provide roadworthy certificates where required\n3. Complete VicRoads transfer forms correctly\n4. Maintain proper records of all transactions\n5. Honor cooling-off periods where applicable\n\nIs there a specific compliance question I can help with?"
    } else {
      response = "I'm here to help with your dealership needs. I can assist with:\n\n- Writing vehicle listings and ads\n- Market pricing guidance\n- Sales and negotiation tips\n- Compliance questions\n- General business advice\n\nWhat would you like to know more about?"
    }

    return NextResponse.json({ content: response })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
