package com.ten.server.controller;

import com.ten.server.entity.Cart;
import com.ten.server.entity.User;
import com.ten.server.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://89.19.176.6:3000")
public class CartController {
    private final CartService cartService;
    @GetMapping("/cart")
    public ResponseEntity<?> getCart(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        List<Cart> cartList = cartService.listCartItems(user);
        return ResponseEntity.ok(new CartResponse(cartList));
    }
    @PostMapping("/cart/{id}/{qty}")
    public ResponseEntity<?> addToCart(@PathVariable("id") Long id, @PathVariable("qty") int quantity){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Integer addedQuantity = cartService.addProduct(id, quantity, user);

        return ResponseEntity.ok("Товар успешно добавлен в корзину");
    }

    @PostMapping("/cart/update/{id}/{qty}")
    public ResponseEntity<?> updateCart(@PathVariable("id") Long id,@PathVariable("qty") int quantity){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        double subTotal = cartService.updateQuantity(id, quantity, user);
        System.out.println(quantity);
        return ResponseEntity.ok(new SubTotalResponse(subTotal));
    }

    @DeleteMapping("/cart/{id}")
    public ResponseEntity<?> removeFromCart(@PathVariable("id") Long id){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        cartService.removeProduct(id,user);
        return ResponseEntity.ok("Предмет удален");
    }
    record SubTotalResponse(double total) {
    }
    record CartResponse(List<Cart> cart){}
}
