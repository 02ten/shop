package com.ten.server.controller;

import com.ten.server.dto.OrderDTO;
import com.ten.server.entity.Cart;
import com.ten.server.entity.Order;
import com.ten.server.entity.User;
import com.ten.server.service.CartService;
import com.ten.server.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://89.19.176.6:3000")
public class OrderController {
    private final OrderService orderService;
    private final CartService cartService;
    @PostMapping("/order")
    public ResponseEntity<?> createOrder(@RequestBody Order orderDTO){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        orderService.createOrder(orderDTO, user, cartService.listCartItems(user));
        return ResponseEntity.ok("Заказ создан");

    }
    @GetMapping("/admin/orders")
    public ResponseEntity<?> moveToOrdersPanel() {
        return ResponseEntity.ok(new OrderResponse(orderService.getAllOrders()));
    }
    record OrderResponse(List<Order> orders){}
}
