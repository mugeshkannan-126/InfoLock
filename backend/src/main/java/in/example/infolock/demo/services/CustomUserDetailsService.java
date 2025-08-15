package in.example.infolock.demo.services;

import java.util.Collections;

import in.example.infolock.demo.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import in.example.infolock.demo.repository.UserRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //Fetch user from database
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow( () -> new UsernameNotFoundException("User not found with email: " + email) );

        return new User(user.getEmail(), user.getPassword(), Collections.singleton(new SimpleGrantedAuthority("USER_ROLE")));
    }


}
