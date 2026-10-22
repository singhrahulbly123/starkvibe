<?php

namespace App\Support;

use App\Models\Order;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class OrderConfirmationMailer
{
    public function send(Order $order): void
    {
        $email = $order->customer['email'] ?? null;
        if (! $email) {
            return;
        }

        $items = collect($order->items)->map(fn (array $item): string => ($item['quantity'] ?? 1).' x '.($item['name'] ?? 'Product').' ('.($item['colour'] ?? '').', '.($item['size'] ?? '').')')->implode("\n");
        $total = (float) $order->subtotal + (float) $order->shipping_charge - (float) $order->discount_amount;
        $message = "Hi ".($order->customer['name'] ?? 'there').",\n\nWe received your StarkVibe order {$order->order_number}.\n\n{$items}\n\nShipping: {$order->shipping_method}\nPayment: {$order->payment_method}\nTotal: INR ".number_format($total, 2)."\n\nWe will contact you to confirm delivery details.\n\nStarkVibe";

        try {
            Mail::raw($message, function (Message $mail) use ($email, $order): void {
                $mail->to($email)->subject('StarkVibe order '.$order->order_number);
            });
        } catch (Throwable $exception) {
            Log::warning('Order confirmation email could not be sent.', ['order_number' => $order->order_number, 'error' => $exception->getMessage()]);
        }
    }
}
