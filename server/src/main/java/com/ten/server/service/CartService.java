package com.ten.server.service;

import com.ten.server.entity.Cart;
import com.ten.server.entity.Product;
import com.ten.server.entity.User;
import com.ten.server.repositories.CartRepository;
import com.ten.server.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;

    public List<Cart> listCartItems(User user){
        return cartRepository.findByUser(user);
    }

    public int addProduct(Long productId, int quantity, User user) {
        int addedQuantity = quantity;
        Product product = productRepository.findById(productId).get();
        Cart cartItem = cartRepository.findByUserAndProduct(user, product);
        if (cartItem != null) {
            addedQuantity = cartItem.getQuantity() + quantity;
            cartItem.setQuantity(addedQuantity);
        } else {
            cartItem = new Cart();
            cartItem.setQuantity(quantity);
            cartItem.setUser(user);
            cartItem.setProduct(product);

        }
        cartRepository.save(cartItem);
        return addedQuantity;
    }

    public double updateQuantity(Long productId, int quantity, User user){
        cartRepository.updateQuantity(quantity,productId,user.getId());
        Product product = productRepository.findById(productId).get();
        double subTotal = product.getPrice() * quantity;
        return subTotal;
    }
    public void removeProduct(Long productId,  User user){
        cartRepository.deleteByUserAndProduct(user.getId(), productId);
    }
}
