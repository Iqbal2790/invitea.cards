import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request, props) {
  try {
    const params = await props.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    const { data: order, error } = await supabase
      .from('orders')
      .select('status_payment')
      .eq('id', id)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ status: order.status_payment }, { status: 200 });
  } catch (error) {
    console.error('API Orders Status Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
