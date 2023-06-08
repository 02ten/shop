package com.ten.server.service;

import com.ten.server.dto.OrderDTO;
import com.ten.server.entity.Cart;
import com.ten.server.entity.Order;
import com.ten.server.entity.OrderProducts;
import com.ten.server.entity.User;
import com.ten.server.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    public void createOrder(Order newOrder, User user, List<Cart> cartList){
        newOrder.setCreationDate(new Date());
        newOrder.setUser(user);
        double total = 0;
        List<OrderProducts> orderProductsList = new ArrayList<>();
        for(Cart cart : cartList){
            total += cart.getProduct().getPrice() * cart.getQuantity();
            OrderProducts orderProducts = new OrderProducts();
            orderProducts.setQuantity(cart.getQuantity());
            orderProducts.setUser(user);
            orderProducts.setProduct(cart.getProduct());
            orderProductsList.add(orderProducts);
        }
        newOrder.setSummary(total);
        newOrder.setProductsList(orderProductsList);
        orderRepository.save(newOrder);
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }
}
